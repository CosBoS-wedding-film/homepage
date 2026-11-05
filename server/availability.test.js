import fs from "node:fs";
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  REASON_OK,
  REASON_OVERLAP,
  REASON_UNKNOWN,
  SHOOT_LEAD_MINUTES,
  SHOOT_TAIL_MINUTES,
  classifyWhen,
  decideAvailability,
  isMonthTab,
  jobsOnDate,
  monthTabName,
  occupiedWindowFromCeremony,
  parseInquiry,
  parseShootWindow,
  windowsOverlap,
} from "./availability.js";

const NOV7 = "2026-11-07";

describe("occupied window", () => {
  it("uses ceremony start minus 90 through plus 60 when shoot time is empty", () => {
    assert.equal(SHOOT_LEAD_MINUTES, 90);
    assert.equal(SHOOT_TAIL_MINUTES, 60);
    assert.deepEqual(occupiedWindowFromCeremony(11 * 60), { startMin: 9 * 60 + 30, endMin: 12 * 60 });
    assert.deepEqual(parseShootWindow("  ", 11 * 60), {
      ok: true,
      window: { startMin: 9 * 60 + 30, endMin: 12 * 60 },
    });
  });

  it("parses a shoot-time cell instead of the default window", () => {
    const parsed = parseShootWindow("9:30 (1.5시간 전) - 12:00 (원판)", 11 * 60);
    assert.deepEqual(parsed, { ok: true, window: { startMin: 9 * 60 + 30, endMin: 12 * 60 } });
    assert.deepEqual(parseShootWindow("８：００ - １０：００", 11 * 60), {
      ok: true,
      window: { startMin: 8 * 60, endMin: 10 * 60 },
    });
  });

  it("does not guess when a present shoot-time cell is not two clock times", () => {
    assert.equal(parseShootWindow("곧 시작", 11 * 60).ok, false);
    assert.equal(parseShootWindow("9:30", 11 * 60).ok, false);
    assert.equal(parseShootWindow("9:30 - 12:00 - 13:00", 11 * 60).ok, false);
    assert.equal(parseShootWindow("10:00 - 10:00", 11 * 60).ok, false);
  });
});

describe("same-day rows", () => {
  it("keeps only that date and skips notes", () => {
    const result = jobsOnDate(
      NOV7,
      ["일시", "261107_1100", "메모", "", "261108_1100", "261107_1800"],
      ["촬영 시간", "8:00 - 10:00", "9:00 - 11:00", "", "9:00 - 11:00", ""],
    );
    assert.deepEqual(result, {
      ok: true,
      jobs: [
        { startMin: 8 * 60, endMin: 10 * 60 },
        { startMin: 18 * 60 - 90, endMin: 18 * 60 + 60 },
      ],
    });
    assert.equal(JSON.stringify(result).includes("원판"), false);
  });

  it("refuses to decide when a same-day shoot time cannot be parsed", () => {
    const result = jobsOnDate(NOV7, ["261107_1100"], ["곧 시작"]);
    assert.deepEqual(result, { ok: false, jobs: [] });
  });

  it("refuses to decide when a datetime cell looks like a code but does not parse", () => {
    assert.equal(classifyWhen("261107_1160").kind, "unknown");
    assert.deepEqual(jobsOnDate(NOV7, ["261107_1160"], [""]), { ok: false, jobs: [] });
    assert.equal(classifyWhen("메모").kind, "skip");
  });
});

describe("overlap decision", () => {
  it("treats touching endpoints as available", () => {
    assert.equal(windowsOverlap({ startMin: 0, endMin: 100 }, { startMin: 100, endMin: 200 }), false);
    const existing = occupiedWindowFromCeremony(11 * 60);
    const inquiry = occupiedWindowFromCeremony(13 * 60 + 30);
    assert.equal(existing.endMin, inquiry.startMin);
    assert.deepEqual(decideAvailability(inquiry, { ok: true, jobs: [existing] }), {
      status: "가능",
      reason: REASON_OK,
    });
  });

  it("marks an overlapping window unavailable without citing the other booking", () => {
    const existing = occupiedWindowFromCeremony(11 * 60);
    const inquiry = occupiedWindowFromCeremony(13 * 60);
    const decision = decideAvailability(inquiry, { ok: true, jobs: [existing] });
    assert.deepEqual(decision, { status: "불가", reason: REASON_OVERLAP });
    assert.doesNotMatch(decision.reason, /\d|홀|원판/);
  });

  it("allows a new booking on a day that already has four non-overlapping jobs", () => {
    const jobs = [8, 11, 14, 17].map((hour) => occupiedWindowFromCeremony(hour * 60));
    const inquiry = occupiedWindowFromCeremony(20 * 60);
    assert.equal(decideAvailability(inquiry, { ok: true, jobs }).status, "가능");
    assert.equal(decideAvailability(occupiedWindowFromCeremony(17 * 60), { ok: true, jobs }).status, "불가");
  });

  it("is available when that day has no jobs and unknown when the sheet cannot be read", () => {
    const inquiry = occupiedWindowFromCeremony(11 * 60);
    assert.deepEqual(decideAvailability(inquiry, { ok: true, jobs: [] }), {
      status: "가능",
      reason: REASON_OK,
    });
    assert.deepEqual(decideAvailability(inquiry, { ok: false, jobs: [] }), {
      status: "확인 필요",
      reason: REASON_UNKNOWN,
    });
  });

  it("uses the parsed shoot window, not the default, for an existing row", () => {
    const jobs = jobsOnDate(NOV7, ["261107_1100"], ["8:00 - 10:00"]);
    const inquiry = occupiedWindowFromCeremony(12 * 60);
    assert.equal(decideAvailability(inquiry, jobs).status, "가능");
    const withDefault = jobsOnDate(NOV7, ["261107_1100"], [""]);
    assert.equal(decideAvailability(inquiry, withDefault).status, "불가");
  });
});

describe("inquiry and tab names", () => {
  it("accepts a ceremony date and time and ignores other fields", () => {
    const parsed = parseInquiry({
      date: "2026-11-07",
      time: "11:00:00",
      venue: "비밀홀",
      phone: "010-0000-0000",
    });
    assert.deepEqual(parsed, {
      date: NOV7,
      window: { startMin: 9 * 60 + 30, endMin: 12 * 60 },
    });
    assert.equal(parseInquiry({ date: "2026-02-31", time: "11:00" }), null);
  });

  it("names only YYYY.MM schedule tabs", () => {
    assert.equal(monthTabName(NOV7), "2026.11");
    assert.equal(isMonthTab("2026.11"), true);
    assert.equal(isMonthTab("Notes"), false);
    assert.equal(isMonthTab("2026.11.1"), false);
  });

  it("does not define a crew cap or a taxi call", () => {
    const dir = new URL(".", import.meta.url);
    for (const name of fs.readdirSync(dir)) {
      if (!name.endsWith(".js") || name.endsWith(".test.js")) continue;
      const text = fs.readFileSync(new URL(name, dir), "utf8");
      assert.doesNotMatch(text, /kakao|KAKAO|MAX_SHOOTERS|택시/);
    }
  });
});
