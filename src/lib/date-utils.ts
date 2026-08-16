/**
 * Date utility helpers for local timezone keys and timestamps
 */

export function pad2(n: number): string {
  return n < 10 ? `0${n}` : `${n}`;
}

export function dayKey(date: Date | string | number = new Date()): string {
  const d = typeof date === "object" ? date : new Date(date);
  const year = d.getFullYear();
  const month = pad2(d.getMonth() + 1);
  const day = pad2(d.getDate());
  return `${year}-${month}-${day}`;
}

export function todayKey(): string {
  return dayKey(new Date());
}

export function addDaysKey(base: string | Date, days: number): string {
  const d = typeof base === "string" ? new Date(`${base}T12:00:00`) : new Date(base);
  d.setDate(d.getDate() + days);
  return dayKey(d);
}

export function localStamp(date: Date | string | number = new Date()): string {
  const d = typeof date === "object" ? date : new Date(date);
  return d.toISOString();
}

export function formatTime(timeStr?: string): string {
  if (!timeStr) return "";
  return timeStr;
}
