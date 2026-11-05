import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { availabilityResponse } from "./api.js";
import { REASON_OVERLAP, REASON_UNKNOWN, occupiedWindowFromCeremony } from "./availability.js";

describe("public availability response", () => {
  it("returns only a status and a generic reason", async () => {
    const result = await availabilityResponse(
      {
        date: "2026-11-07",
        time: "11:00",
        venue: "비밀홀 주소",
        phone: "010-1234-5678",
        name: "홍길동",
      },
      async () => ({ ok: true, jobs: [occupiedWindowFromCeremony(11 * 60)] }),
    );
    assert.deepEqual(result, {
      httpStatus: 200,
      body: { status: "불가", reason: REASON_OVERLAP },
    });
    const encoded = JSON.stringify(result.body);
    assert.equal(encoded.includes("비밀"), false);
    assert.equal(encoded.includes("010"), false);
    assert.equal(encoded.includes("홍길동"), false);
    assert.deepEqual(Object.keys(result.body), ["status", "reason"]);
  });

  it("does not report available when the schedule cannot be read", async () => {
    const err = new Error("missing google credential");
    err.code = "NO_CREDENTIAL";
    const result = await availabilityResponse({ date: "2026-11-07", time: "11:00" }, async () => {
      throw err;
    });
    assert.deepEqual(result.body, { status: "확인 필요", reason: REASON_UNKNOWN });
  });

  it("does not read the schedule for a malformed inquiry", async () => {
    let called = false;
    const result = await availabilityResponse({ date: "2026-02-31", time: "11:00" }, async () => {
      called = true;
      return { ok: true, jobs: [] };
    });
    assert.equal(called, false);
    assert.equal(result.body.status, "확인 필요");
  });

  it("is available when the loaded day has no overlapping jobs", async () => {
    const result = await availabilityResponse({ date: "2026-11-07", time: "20:00" }, async () => ({
      ok: true,
      jobs: [8, 11, 14, 17].map((hour) => occupiedWindowFromCeremony(hour * 60)),
    }));
    assert.equal(result.body.status, "가능");
  });
});
