import assert from "node:assert/strict";
import { describe, it } from "node:test";
import path from "node:path";
import { ROOT, resolvePublicPath } from "./static.js";

describe("public files", () => {
  it("serves site pages and hides env and plan files", () => {
    assert.equal(resolvePublicPath("/contact/"), path.join(ROOT, "contact"));
    assert.equal(resolvePublicPath("/contact/index.html"), path.join(ROOT, "contact", "index.html"));
    assert.equal(resolvePublicPath("/"), path.join(ROOT, "index.html"));
    assert.equal(resolvePublicPath("/.env"), null);
    assert.equal(resolvePublicPath("/../.env"), null);
    assert.equal(resolvePublicPath("/plan/plan_260606.md"), null);
    assert.equal(resolvePublicPath("/.git/config"), null);
  });
});
