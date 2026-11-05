export const SHOOT_LEAD_MINUTES = 90;
export const SHOOT_TAIL_MINUTES = 60;

export const REASON_OK = "겹치는 일정이 없습니다";
export const REASON_OVERLAP = "이미 예약된 시간과 겹칩니다";
export const REASON_UNKNOWN = "일정을 확인할 수 없습니다";

export function monthTabName(dateKey) {
  const [year, month] = dateKey.split("-");
  return `${year}.${month}`;
}

export function isMonthTab(title) {
  return /^\d{4}\.\d{2}$/.test(String(title));
}

export function occupiedWindowFromCeremony(ceremonyMin) {
  return {
    startMin: ceremonyMin - SHOOT_LEAD_MINUTES,
    endMin: ceremonyMin + SHOOT_TAIL_MINUTES,
  };
}

function clockToMinutes(hourText, minuteText) {
  const hour = Number(hourText);
  const minute = Number(minuteText);
  if (!Number.isInteger(hour) || !Number.isInteger(minute)) return null;
  if (hour > 23 || minute > 59) return null;
  return hour * 60 + minute;
}

export function parseWhen(value) {
  const match = String(value).trim().match(/^(\d{2})(\d{2})(\d{2})_(\d{2})(\d{2})$/);
  if (!match) return null;
  const year = 2000 + Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const minutes = clockToMinutes(match[4], match[5]);
  if (month < 1 || month > 12 || minutes == null) return null;
  const date = new Date(Date.UTC(year, month - 1, day));
  if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) {
    return null;
  }
  const dateKey = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  return { dateKey, minutes };
}

export function classifyWhen(value) {
  const text = String(value ?? "").trim();
  if (!text) return { kind: "skip" };
  const when = parseWhen(text);
  if (when) return { kind: "job", when };
  if (/\d{6}_\d{4}/.test(text)) return { kind: "unknown" };
  return { kind: "skip" };
}

export function parseShootWindow(cell, ceremonyMin) {
  const text = String(cell ?? "").normalize("NFKC").trim();
  if (!text) return { ok: true, window: occupiedWindowFromCeremony(ceremonyMin) };
  const matches = [...text.matchAll(/(\d{1,2})\s*:\s*(\d{2})/g)];
  if (matches.length !== 2) return { ok: false };
  const startMin = clockToMinutes(matches[0][1], matches[0][2]);
  const endMin = clockToMinutes(matches[1][1], matches[1][2]);
  if (startMin == null || endMin == null || endMin <= startMin) return { ok: false };
  return { ok: true, window: { startMin, endMin } };
}

export function jobsOnDate(dateKey, whenCells, shootCells) {
  const count = Math.max(whenCells.length, shootCells.length);
  const jobs = [];
  for (let i = 0; i < count; i += 1) {
    const classified = classifyWhen(whenCells[i]);
    if (classified.kind === "skip") continue;
    if (classified.kind !== "job") return { ok: false, jobs: [] };
    if (classified.when.dateKey !== dateKey) continue;
    const shoot = parseShootWindow(shootCells[i], classified.when.minutes);
    if (!shoot.ok) return { ok: false, jobs: [] };
    jobs.push(shoot.window);
  }
  return { ok: true, jobs };
}

export function windowsOverlap(a, b) {
  return a.startMin < b.endMin && b.startMin < a.endMin;
}

export function decideAvailability(inquiryWindow, schedule) {
  if (!schedule || schedule.ok !== true || !Array.isArray(schedule.jobs)) {
    return { status: "확인 필요", reason: REASON_UNKNOWN };
  }
  for (const job of schedule.jobs) {
    if (windowsOverlap(inquiryWindow, job)) {
      return { status: "불가", reason: REASON_OVERLAP };
    }
  }
  return { status: "가능", reason: REASON_OK };
}

export function parseInquiry(body) {
  if (!body || typeof body !== "object") return null;
  const date = String(body.date ?? "").trim();
  const time = String(body.time ?? "").trim();
  const dateMatch = date.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  const timeMatch = time.match(/^(\d{2}):(\d{2})(?::\d{2})?$/);
  if (!dateMatch || !timeMatch) return null;
  const year = Number(dateMatch[1]);
  const month = Number(dateMatch[2]);
  const day = Number(dateMatch[3]);
  const minutes = clockToMinutes(timeMatch[1], timeMatch[2]);
  if (minutes == null) return null;
  const utc = new Date(Date.UTC(year, month - 1, day));
  if (utc.getUTCFullYear() !== year || utc.getUTCMonth() !== month - 1 || utc.getUTCDate() !== day) {
    return null;
  }
  return {
    date,
    window: occupiedWindowFromCeremony(minutes),
  };
}
