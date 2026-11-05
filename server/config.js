// GOOGLE_SERVICE_ACCOUNT_JSON = the service account key JSON, on one line.
// Share the schedule spreadsheet with that key's client_email as a viewer.
// Availability does not call a mobility API and does not use travel time.

import fs from "node:fs";

export const SPREADSHEET_ID = "1Z5K9otbS1go4NcKSQyOJ3lSTt8y7bNYsUYFkdxU8qIE";
export const CONSULT_TAB = "상담출처";

export function loadDotEnv(filePath) {
  if (process.env.GOOGLE_SERVICE_ACCOUNT_JSON) return;
  if (!filePath || !fs.existsSync(filePath)) return;
  const text = fs.readFileSync(filePath, "utf8");
  for (const line of text.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    if (key !== "GOOGLE_SERVICE_ACCOUNT_JSON") continue;
    let value = trimmed.slice(eq + 1).trim();
    const quoted =
      (value.startsWith("'") && value.endsWith("'")) ||
      (value.startsWith('"') && value.endsWith('"'));
    if (quoted) value = value.slice(1, -1);
    process.env.GOOGLE_SERVICE_ACCOUNT_JSON = value;
    return;
  }
}

export function readServiceAccountJson() {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!raw || !String(raw).trim()) return null;
  try {
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed.client_email !== "string" || typeof parsed.private_key !== "string") {
      return null;
    }
    return { client_email: parsed.client_email, private_key: parsed.private_key };
  } catch {
    return null;
  }
}
