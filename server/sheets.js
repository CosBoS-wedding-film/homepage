import crypto from "node:crypto";
import { CONSULT_TAB, SPREADSHEET_ID, readServiceAccountJson } from "./config.js";
import { isMonthTab, jobsOnDate, monthTabName } from "./availability.js";
import { entriesFromColumns, findConsultColumns, normHeader } from "./consult.js";

const SHEETS_BASE = "https://sheets.googleapis.com/v4/spreadsheets";
const TOKEN_URL = "https://oauth2.googleapis.com/token";
const CACHE_MS = 60_000;
const defaultCache = new Map();
let tokenCache = null;

function b64url(value) {
  return Buffer.from(value).toString("base64url");
}

export function columnLetter(index) {
  let n = index + 1;
  let letters = "";
  while (n > 0) {
    const rem = (n - 1) % 26;
    letters = String.fromCharCode(65 + rem) + letters;
    n = Math.floor((n - 1) / 26);
  }
  return letters;
}

export async function fetchAccessToken(account, fetchImpl, nowSeconds = Math.floor(Date.now() / 1000)) {
  const header = b64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const payload = b64url(JSON.stringify({
    iss: account.client_email,
    scope: "https://www.googleapis.com/auth/spreadsheets.readonly",
    aud: TOKEN_URL,
    iat: nowSeconds,
    exp: nowSeconds + 3600,
  }));
  const unsigned = `${header}.${payload}`;
  const signer = crypto.createSign("RSA-SHA256");
  signer.update(unsigned);
  signer.end();
  const signature = signer.sign(account.private_key).toString("base64url");
  const response = await fetchImpl(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: `${unsigned}.${signature}`,
    }),
  });
  if (!response.ok) {
    await response.arrayBuffer().catch(() => {});
    const err = new Error("google token request failed");
    err.code = "TOKEN";
    throw err;
  }
  const json = await response.json();
  if (!json.access_token) {
    const err = new Error("google token missing");
    err.code = "TOKEN";
    throw err;
  }
  return {
    accessToken: json.access_token,
    expiresAt: nowSeconds + (Number(json.expires_in) || 3600) - 60,
  };
}

function missingCredential() {
  const err = new Error("missing google credential");
  err.code = "NO_CREDENTIAL";
  return err;
}

function sheetsError() {
  const err = new Error("sheets request failed");
  err.code = "SHEETS";
  return err;
}

function accountFrom(deps) {
  if (deps.account !== undefined) return deps.account;
  return readServiceAccountJson();
}

async function authorizedToken(account, deps) {
  if (deps.token) return deps.token;
  const fetchImpl = deps.fetch;
  const now = Math.floor(Date.now() / 1000);
  if (tokenCache && tokenCache.email === account.client_email && tokenCache.expiresAt > now) {
    return tokenCache.accessToken;
  }
  const fetched = await fetchAccessToken(account, fetchImpl, now);
  tokenCache = { email: account.client_email, ...fetched };
  return fetched.accessToken;
}

async function fetchJson(url, token, fetchImpl) {
  const response = await fetchImpl(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) {
    await response.arrayBuffer().catch(() => {});
    const err = sheetsError();
    err.status = response.status;
    throw err;
  }
  return response.json();
}

function sheetsUrl(params) {
  const url = new URL(`${SHEETS_BASE}/${SPREADSHEET_ID}`);
  for (const [key, value] of Object.entries(params)) {
    if (Array.isArray(value)) {
      for (const item of value) url.searchParams.append(key, item);
    } else {
      url.searchParams.set(key, value);
    }
  }
  return url;
}

async function listTitles(token, fetchImpl) {
  const url = sheetsUrl({ fields: "sheets.properties.title" });
  const json = await fetchJson(url, token, fetchImpl);
  return (json.sheets || []).map((sheet) => sheet.properties && sheet.properties.title).filter(Boolean);
}

function formattedCells(values, startColumn) {
  const cells = (values || []).map((cell) => (cell && cell.formattedValue) || "");
  return Array(startColumn || 0).fill("").concat(cells);
}

export function headerCells(block) {
  if (!block) return [];
  const row = block.rowData && block.rowData[0];
  return formattedCells(row && row.values, block.startColumn);
}

export function columnCells(block) {
  if (!block) return [];
  const startRow = block.startRow || 0;
  const rows = (block.rowData || []).map((row) => {
    const cell = row && row.values && row.values[0];
    return (cell && cell.formattedValue) || "";
  });
  return Array(startRow).fill("").concat(rows);
}

function allBlocks(json) {
  const blocks = [];
  for (const sheet of json.sheets || []) {
    for (const block of sheet.data || []) blocks.push(block);
  }
  return blocks;
}

async function readGrid(token, fetchImpl, ranges) {
  const url = sheetsUrl({
    ranges,
    includeGridData: "true",
    fields: "sheets.data.startRow,sheets.data.startColumn,sheets.data.rowData.values.formattedValue",
  });
  const json = await fetchJson(url, token, fetchImpl);
  return allBlocks(json);
}

async function readHeader(token, fetchImpl, tab) {
  const blocks = await readGrid(token, fetchImpl, [`'${tab}'!1:1`]);
  return headerCells(blocks[0]);
}

async function readTwoColumns(token, fetchImpl, tab, firstIndex, secondIndex) {
  const ranges = [firstIndex, secondIndex].map((index) => `'${tab}'!${columnLetter(index)}:${columnLetter(index)}`);
  const blocks = await readGrid(token, fetchImpl, ranges);
  if (blocks.length < 2) throw sheetsError();
  return { first: columnCells(blocks[0]), second: columnCells(blocks[1]) };
}

function cacheGet(cache, key) {
  if (!cache) return null;
  const hit = cache.get(key);
  if (!hit || hit.expires <= Date.now()) return null;
  return hit.value;
}

function cacheSet(cache, key, value) {
  if (!cache) return;
  cache.set(key, { expires: Date.now() + CACHE_MS, value });
}

export async function loadSchedule(dateKey, deps = {}) {
  const account = accountFrom(deps);
  if (!account) throw missingCredential();
  const fetchImpl = deps.fetch ?? globalThis.fetch;
  const cache = deps.cache === undefined ? defaultCache : deps.cache;
  const tab = monthTabName(dateKey);
  if (!isMonthTab(tab)) return { ok: false, jobs: [] };

  const cacheKey = `schedule:${tab}`;
  const cached = cacheGet(cache, cacheKey);
  if (cached) return jobsOnDate(dateKey, cached.when, cached.shoot);

  const token = await authorizedToken(account, { ...deps, fetch: fetchImpl });
  const titles = await listTitles(token, fetchImpl);
  if (!titles.includes(tab)) {
    const empty = { when: [], shoot: [] };
    cacheSet(cache, cacheKey, empty);
    return { ok: true, jobs: [] };
  }

  const header = await readHeader(token, fetchImpl, tab);
  const whenIndex = header.findIndex((cell) => normHeader(cell) === "일시");
  const shootIndex = header.findIndex((cell) => normHeader(cell) === "촬영시간");
  if (whenIndex < 0 || shootIndex < 0) return { ok: false, jobs: [] };

  const columns = await readTwoColumns(token, fetchImpl, tab, whenIndex, shootIndex);
  const cells = { when: columns.first, shoot: columns.second };
  cacheSet(cache, cacheKey, cells);
  return jobsOnDate(dateKey, cells.when, cells.shoot);
}

export async function loadConsultSheet(deps = {}) {
  const account = accountFrom(deps);
  if (!account) throw missingCredential();
  const fetchImpl = deps.fetch ?? globalThis.fetch;
  const cache = deps.cache === undefined ? defaultCache : deps.cache;
  const cacheKey = `consult:${CONSULT_TAB}`;
  const cached = cacheGet(cache, cacheKey);
  if (cached) return cached;

  const token = await authorizedToken(account, { ...deps, fetch: fetchImpl });
  const titles = await listTitles(token, fetchImpl);
  if (!titles.includes(CONSULT_TAB)) {
    const missing = { tabFound: false, entries: [] };
    cacheSet(cache, cacheKey, missing);
    return missing;
  }

  const header = await readHeader(token, fetchImpl, CONSULT_TAB);
  const columns = findConsultColumns(header);
  if (!columns) {
    const err = new Error("consult columns missing");
    err.code = "CONSULT_COLUMNS";
    throw err;
  }
  const cells = await readTwoColumns(token, fetchImpl, CONSULT_TAB, columns.headingIndex, columns.bodyIndex);
  const headerLabel = normHeader(header[columns.headingIndex]);
  const bodyLabel = normHeader(header[columns.bodyIndex]);
  const headerIsFirstRow = normHeader(cells.first[0]) === headerLabel && normHeader(cells.second[0]) === bodyLabel;
  const value = {
    tabFound: true,
    entries: entriesFromColumns(
      headerIsFirstRow ? cells.first.slice(1) : cells.first,
      headerIsFirstRow ? cells.second.slice(1) : cells.second,
      headerIsFirstRow ? 2 : 1,
    ),
  };
  cacheSet(cache, cacheKey, value);
  return value;
}
