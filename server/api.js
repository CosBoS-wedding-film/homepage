import { decideAvailability, parseInquiry, REASON_UNKNOWN } from "./availability.js";
import { consultResult, NOT_IN_SOURCE, SOURCE_UNREADABLE } from "./consult.js";

export async function availabilityResponse(body, loadSchedule) {
  const inquiry = parseInquiry(body);
  if (!inquiry) {
    return { httpStatus: 200, body: { status: "확인 필요", reason: REASON_UNKNOWN } };
  }
  try {
    const schedule = await loadSchedule(inquiry.date);
    const decision = decideAvailability(inquiry.window, schedule);
    return {
      httpStatus: 200,
      body: { status: decision.status, reason: decision.reason },
    };
  } catch (err) {
    console.error("schedule unread", err && err.code ? err.code : "error");
    return { httpStatus: 200, body: { status: "확인 필요", reason: REASON_UNKNOWN } };
  }
}

export async function consultResponse(body, loadConsult) {
  const question = body && typeof body.question === "string" ? body.question.trim() : "";
  if (!question || question.length > 500) {
    return { httpStatus: 200, body: { message: NOT_IN_SOURCE, answers: [] } };
  }
  try {
    const loaded = await loadConsult();
    const result = consultResult({ tabFound: loaded.tabFound, entries: loaded.entries, question });
    return {
      httpStatus: 200,
      body: {
        message: result.message,
        answers: result.answers.map((answer) => ({
          text: answer.text,
          sourceTab: answer.sourceTab,
          sourceLocation: answer.sourceLocation,
        })),
      },
    };
  } catch (err) {
    console.error("consult unread", err && err.code ? err.code : "error");
    return { httpStatus: 200, body: { message: SOURCE_UNREADABLE, answers: [] } };
  }
}
