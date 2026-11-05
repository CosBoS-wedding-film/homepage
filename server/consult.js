import { CONSULT_TAB } from "./config.js";

export { CONSULT_TAB };
export const NOT_IN_SOURCE = "상담출처에 없는 내용입니다.";
export const SOURCE_UNREADABLE = "출처를 확인할 수 없어 답변할 수 없습니다.";

const HEADING_HEADERS = new Set(["제목", "질문", "항목"]);
const BODY_HEADERS = new Set(["내용", "답변", "설명"]);

export function normHeader(value) {
  return String(value ?? "").normalize("NFKC").replace(/\s+/g, "").trim();
}

export function findConsultColumns(headerCells) {
  const headingIndex = headerCells.findIndex((cell) => HEADING_HEADERS.has(normHeader(cell)));
  const bodyIndex = headerCells.findIndex((cell) => BODY_HEADERS.has(normHeader(cell)));
  if (headingIndex < 0 || bodyIndex < 0) return null;
  return { headingIndex, bodyIndex };
}

export function entriesFromColumns(headingCells, bodyCells, firstRowNumber) {
  const count = Math.max(headingCells.length, bodyCells.length);
  const entries = [];
  for (let i = 0; i < count; i += 1) {
    const heading = String(headingCells[i] ?? "").trim();
    const body = String(bodyCells[i] ?? "").trim();
    if (!heading && !body) continue;
    entries.push({
      heading,
      body,
      rowNumber: firstRowNumber + i,
    });
  }
  return entries;
}

function normalizeText(value) {
  return String(value).normalize("NFKC").toLowerCase().replace(/[\s\p{P}\p{S}]+/gu, "");
}

export function answerFromEntries(question, entries) {
  const normalizedQuestion = normalizeText(question);
  if (!normalizedQuestion) return { message: NOT_IN_SOURCE, answers: [] };
  const answers = [];
  for (const entry of entries) {
    if (!entry.body) continue;
    const heading = normalizeText(entry.heading);
    const matched = heading.length >= 2 && (normalizedQuestion.includes(heading) || heading.includes(normalizedQuestion));
    if (!matched) continue;
    answers.push({
      text: entry.body,
      sourceTab: CONSULT_TAB,
      sourceLocation: entry.heading || `${entry.rowNumber}행`,
    });
  }
  if (answers.length === 0) return { message: NOT_IN_SOURCE, answers: [] };
  return { message: "", answers };
}

export function consultResult({ tabFound, entries, question }) {
  if (!tabFound) return { message: NOT_IN_SOURCE, answers: [] };
  return answerFromEntries(question, entries || []);
}
