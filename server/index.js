import http from "node:http";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { availabilityResponse, consultResponse } from "./api.js";
import { loadDotEnv } from "./config.js";
import { loadConsultSheet, loadSchedule } from "./sheets.js";
import { ROOT, serveStatic } from "./static.js";

const JSON_LIMIT = 16 * 1024;

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Cache-Control": "no-store",
};

function sendJson(res, status, body) {
  res.writeHead(status, { ...CORS, "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(body));
}

function readJson(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    req.on("data", (chunk) => {
      size += chunk.length;
      if (size > JSON_LIMIT) {
        const err = new Error("body too large");
        err.code = "LIMIT";
        reject(err);
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on("end", () => {
      const text = Buffer.concat(chunks).toString("utf8");
      if (!text) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(text));
      } catch {
        const err = new Error("bad json");
        err.code = "BAD_JSON";
        reject(err);
      }
    });
    req.on("error", reject);
  });
}

export function createServer() {
  loadDotEnv(path.join(ROOT, ".env"));
  return http.createServer(async (req, res) => {
    const pathname = new URL(req.url, "http://127.0.0.1").pathname;
    try {
      if (req.method === "OPTIONS" && pathname.startsWith("/api/")) {
        res.writeHead(204, CORS);
        res.end();
        return;
      }
      if (req.method === "POST" && pathname === "/api/availability") {
        const body = await readJson(req);
        const result = await availabilityResponse(body, loadSchedule);
        sendJson(res, result.httpStatus, result.body);
        return;
      }
      if (req.method === "POST" && pathname === "/api/consult") {
        const body = await readJson(req);
        const result = await consultResponse(body, loadConsultSheet);
        sendJson(res, result.httpStatus, result.body);
        return;
      }
      if (req.method === "GET" || req.method === "HEAD") {
        serveStatic(req, res);
        return;
      }
      sendJson(res, 405, { status: "확인 필요", reason: "일정을 확인할 수 없습니다." });
    } catch (err) {
      console.error("request failed", err && err.code ? err.code : "error");
      if (res.headersSent) return;
      const consult = pathname === "/api/consult";
      sendJson(res, 400, consult
        ? { message: "출처를 확인할 수 없어 답변할 수 없습니다.", answers: [] }
        : { status: "확인 필요", reason: "일정을 확인할 수 없습니다." });
    }
  });
}

const entry = process.argv[1] ? pathToFileURL(path.resolve(process.argv[1])).href : "";
if (entry === import.meta.url) {
  const port = Number(process.env.PORT) || 8787;
  const host = process.env.HOST || "127.0.0.1";
  createServer().listen(port, host, () => {
    console.log(`listening on http://${host}:${port}`);
  });
}
