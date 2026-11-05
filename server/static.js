import fs from "node:fs";
import path from "node:path";

export const ROOT = path.resolve(import.meta.dirname, "..");

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};

export function resolvePublicPath(urlPath) {
  let pathname = urlPath.split("?")[0];
  try {
    pathname = decodeURIComponent(pathname);
  } catch {
    return null;
  }
  if (pathname.includes("\0")) return null;
  pathname = pathname.replace(/^\/+/, "");
  if (pathname === "") pathname = "index.html";
  const abs = path.resolve(ROOT, pathname);
  const rootWithSep = ROOT.endsWith(path.sep) ? ROOT : ROOT + path.sep;
  if (abs !== ROOT && !abs.startsWith(rootWithSep)) return null;
  const rel = path.relative(ROOT, abs);
  if (rel.startsWith("..")) return null;
  const parts = rel.split(path.sep);
  if (parts.some((part) => part.startsWith("."))) return null;
  if (rel === "plan" || rel.startsWith(`plan${path.sep}`)) return null;
  return abs;
}

export function serveStatic(req, res) {
  const url = new URL(req.url, "http://127.0.0.1");
  let abs = resolvePublicPath(url.pathname);
  if (!abs) {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Not found");
    return;
  }
  try {
    let stat = fs.statSync(abs);
    if (stat.isDirectory()) {
      abs = path.join(abs, "index.html");
      stat = fs.statSync(abs);
    }
    if (!stat.isFile()) throw new Error("not a file");
    const type = TYPES[path.extname(abs).toLowerCase()] || "application/octet-stream";
    res.writeHead(200, { "Content-Type": type });
    if (req.method === "HEAD") {
      res.end();
      return;
    }
    const stream = fs.createReadStream(abs);
    stream.on("error", () => {
      if (!res.headersSent) res.writeHead(404);
      res.end();
    });
    stream.pipe(res);
  } catch {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Not found");
  }
}
