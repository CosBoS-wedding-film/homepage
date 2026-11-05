import crypto from "node:crypto";
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { columnLetter, fetchAccessToken, loadConsultSheet, loadSchedule } from "./sheets.js";
import { SPREADSHEET_ID } from "./config.js";

const ACCOUNT = { client_email: "sheets@example.iam.gserviceaccount.com", private_key: "unused-in-this-test" };

function jsonResponse(body, status = 200) {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
  };
}

function columnBlock(values) {
  return {
    startRow: 0,
    startColumn: 0,
    rowData: values.map((value) => ({
      values: [{ formattedValue: value }],
    })),
  };
}

function headerBlock(labels) {
  return {
    startRow: 0,
    startColumn: 0,
    rowData: [{ values: labels.map((label) => ({ formattedValue: label })) }],
  };
}

function rangesOf(url) {
  return new URL(url).searchParams.getAll("ranges");
}

describe("sheet reads", () => {
  it("reads only the month tab's ceremony and shoot columns", async () => {
    const calls = [];
    const columns = {
      B: ["촬영 시간", "8:00 - 10:00", "", ""],
      C: ["일시", "261107_1100", "", "261107_1800"],
    };
    async function fetchImpl(url, options) {
      calls.push(String(url));
      assert.equal(options.headers.Authorization, "Bearer test-token");
      const parsed = new URL(url);
      assert.equal(parsed.pathname, `/v4/spreadsheets/${SPREADSHEET_ID}`);
      const fields = parsed.searchParams.get("fields");
      const ranges = rangesOf(url);
      if (fields === "sheets.properties.title") {
        assert.equal(ranges.length, 0);
        return jsonResponse({
          sheets: [
            { properties: { title: "Notes" } },
            { properties: { title: "2026.11" } },
          ],
        });
      }
      assert.equal(ranges.some((range) => range.includes("Notes") || range.includes("!A")), false);
      if (ranges.length === 1 && ranges[0] === "'2026.11'!1:1") {
        return jsonResponse({ sheets: [{ data: [headerBlock(["고객명", "촬영 시간", "일시"])] }] });
      }
      assert.deepEqual(ranges, ["'2026.11'!C:C", "'2026.11'!B:B"]);
      return jsonResponse({
        sheets: [{ data: [columnBlock(columns.C), columnBlock(columns.B)] }],
      });
    }

    const result = await loadSchedule("2026-11-07", {
      account: ACCOUNT,
      token: "test-token",
      fetch: fetchImpl,
      cache: new Map(),
    });
    assert.deepEqual(result, {
      ok: true,
      jobs: [
        { startMin: 8 * 60, endMin: 10 * 60 },
        { startMin: 18 * 60 - 90, endMin: 18 * 60 + 60 },
      ],
    });
    assert.equal(JSON.stringify(result).includes("고객명"), false);
    assert.equal(calls.length, 3);
  });

  it("treats a missing month tab as a day with no jobs and does not read cells", async () => {
    const calls = [];
    async function fetchImpl(url) {
      calls.push(String(url));
      return jsonResponse({
        sheets: [{ properties: { title: "2026.10" } }, { properties: { title: "Notes" } }],
      });
    }
    const result = await loadSchedule("2026-11-07", {
      account: ACCOUNT,
      token: "test-token",
      fetch: fetchImpl,
      cache: new Map(),
    });
    assert.deepEqual(result, { ok: true, jobs: [] });
    assert.equal(calls.length, 1);
    assert.equal(rangesOf(calls[0]).length, 0);
  });

  it("does not call the network without a credential", async () => {
    await assert.rejects(
      () => loadSchedule("2026-11-07", {
        account: null,
        fetch: () => {
          throw new Error("network");
        },
        cache: new Map(),
      }),
      (err) => err.code === "NO_CREDENTIAL",
    );
  });

  it("reads only the consult tab's heading and answer columns", async () => {
    const calls = [];
    async function fetchImpl(url) {
      calls.push(String(url));
      const ranges = rangesOf(url);
      const fields = new URL(url).searchParams.get("fields");
      if (fields === "sheets.properties.title") {
        return jsonResponse({
          sheets: [
            { properties: { title: "2026.11" } },
            { properties: { title: "상담출처" } },
          ],
        });
      }
      assert.equal(ranges.some((range) => range.includes("2026.11") || range.includes("!A")), false);
      if (ranges.length === 1) {
        assert.equal(ranges[0], "'상담출처'!1:1");
        return jsonResponse({ sheets: [{ data: [headerBlock(["내부메모", "제목", "내용"])] }] });
      }
      assert.deepEqual(ranges, ["'상담출처'!B:B", "'상담출처'!C:C"]);
      return jsonResponse({
        sheets: [{
          data: [
            columnBlock(["제목", "출장비"]),
            columnBlock(["내용", "서울은 출장비가 없습니다."]),
          ],
        }],
      });
    }

    const result = await loadConsultSheet({
      account: ACCOUNT,
      token: "test-token",
      fetch: fetchImpl,
      cache: new Map(),
    });
    assert.deepEqual(result, {
      tabFound: true,
      entries: [{ heading: "출장비", body: "서울은 출장비가 없습니다.", rowNumber: 2 }],
    });
    assert.equal(JSON.stringify(result).includes("내부메모"), false);
  });

  it("reports a missing consult tab without reading another tab", async () => {
    let rangeReads = 0;
    const result = await loadConsultSheet({
      account: ACCOUNT,
      token: "test-token",
      cache: new Map(),
      fetch: async (url) => {
        const ranges = rangesOf(url);
        if (ranges.length) rangeReads += 1;
        return jsonResponse({ sheets: [{ properties: { title: "2026.11" } }] });
      },
    });
    assert.deepEqual(result, { tabFound: false, entries: [] });
    assert.equal(rangeReads, 0);
  });
});

describe("google token", () => {
  it("requests a read-only sheets token and does not send the spreadsheet id", async () => {
    const { privateKey } = crypto.generateKeyPairSync("rsa", { modulusLength: 2048 });
    const pem = privateKey.export({ type: "pkcs8", format: "pem" });
    let posted = "";
    const token = await fetchAccessToken(
      { client_email: "sheets@example.iam.gserviceaccount.com", private_key: pem },
      async (url, options) => {
        assert.equal(url, "https://oauth2.googleapis.com/token");
        posted = String(options.body);
        assert.equal(posted.includes(SPREADSHEET_ID), false);
        return jsonResponse({ access_token: "ya29.test", expires_in: 3600 });
      },
      1_700_000_000,
    );
    assert.equal(token.accessToken, "ya29.test");
    assert.match(posted, /grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer/);
    assert.equal(posted.split(".").length >= 3, true);
  });

  it("numbers columns in A1 notation", () => {
    assert.equal(columnLetter(0), "A");
    assert.equal(columnLetter(1), "B");
    assert.equal(columnLetter(25), "Z");
    assert.equal(columnLetter(26), "AA");
  });
});
