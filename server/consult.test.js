import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { consultResponse } from "./api.js";
import {
  NOT_IN_SOURCE,
  SOURCE_UNREADABLE,
  answerFromEntries,
  consultResult,
  entriesFromColumns,
} from "./consult.js";

const entries = entriesFromColumns(
  ["제목", "출장비", "계약금", ""],
  ["내용", "서울은 출장비가 없습니다.", "계약금 안내는 시트에 적힌 문장입니다.", ""],
  1,
).filter((entry) => entry.heading !== "제목");

describe("cited consult", () => {
  it("returns the sheet text and the tab plus heading", () => {
    const result = answerFromEntries("출장비는 어떻게 되나요?", entries);
    assert.deepEqual(result, {
      message: "",
      answers: [
        {
          text: "서울은 출장비가 없습니다.",
          sourceTab: "상담출처",
          sourceLocation: "출장비",
        },
      ],
    });
  });

  it("returns every matching row without rewriting it", () => {
    const result = answerFromEntries("출장비와 계약금이 궁금합니다", entries);
    assert.deepEqual(result.answers.map((answer) => answer.text), [
      "서울은 출장비가 없습니다.",
      "계약금 안내는 시트에 적힌 문장입니다.",
    ]);
    assert.deepEqual(result.answers.map((answer) => answer.sourceLocation), ["출장비", "계약금"]);
  });

  it("does not answer from outside the sheet when nothing matches", () => {
    const result = answerFromEntries("오늘 날씨가 어때요?", entries);
    assert.deepEqual(result, { message: NOT_IN_SOURCE, answers: [] });
    assert.equal(JSON.stringify(result).includes("출장비"), false);
    assert.equal(JSON.stringify(result).includes("770"), false);
  });

  it("says the question is not in the source when the tab is missing", () => {
    const result = consultResult({
      tabFound: false,
      entries: [{ heading: "출장비", body: "서울은 출장비가 없습니다.", rowNumber: 2 }],
      question: "출장비",
    });
    assert.deepEqual(result, { message: NOT_IN_SOURCE, answers: [] });
  });

  it("cites the row number when a matching heading is blank", () => {
    const result = answerFromEntries("안내", [
      { heading: "", body: "빈 제목은 매칭되지 않습니다.", rowNumber: 4 },
      { heading: "안내", body: "이 행이 답입니다.", rowNumber: 5 },
    ]);
    assert.equal(result.answers.length, 1);
    assert.equal(result.answers[0].sourceLocation, "안내");
    assert.equal(result.answers[0].text, "이 행이 답입니다.");
  });
});

describe("consult http result", () => {
  it("does not call the sheet for an empty question", async () => {
    let called = false;
    const result = await consultResponse({ question: "  " }, async () => {
      called = true;
      return { tabFound: true, entries: [] };
    });
    assert.equal(called, false);
    assert.deepEqual(result.body, { message: NOT_IN_SOURCE, answers: [] });
  });

  it("uses a fixed unread message when the credential or sheet read fails", async () => {
    const err = new Error("missing google credential");
    err.code = "NO_CREDENTIAL";
    const result = await consultResponse({ question: "가격이 얼마예요?" }, async () => {
      throw err;
    });
    assert.deepEqual(result.body, { message: SOURCE_UNREADABLE, answers: [] });
    assert.equal(Object.keys(result.body).join(), "message,answers");
  });
});
