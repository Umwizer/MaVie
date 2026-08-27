import type { DailyScoreEntry } from "../types/health";

export type ScorePoint = {
  label: string;
  value: number; // 0–1, normalized bar height
  highlight?: boolean;
};

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function average(nums: number[]): number {
  if (nums.length === 0) return 0;
  return nums.reduce((a, b) => a + b, 0) / nums.length;
}

/** Builds the last 7 days of data (today included), normalized 0-1 against the highest value shown. */
export function buildWeeklyView(entries: DailyScoreEntry[]) {
  const today = new Date();
  const days: { date: string; score: number }[] = [];

  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const iso = d.toISOString().slice(0, 10);
    const entry = entries.find((e) => e.date === iso);
    days.push({ date: iso, score: entry?.score ?? 0 });
  }

  const max = Math.max(...days.map((d) => d.score), 1);
  const points: ScorePoint[] = days.map((d, i) => ({
    label: DAY_LABELS[new Date(d.date).getDay()],
    value: d.score / max,
    highlight: i >= days.length - 2,
  }));

  const latestScore = days[days.length - 1]?.score ?? 0;
  const previousWeekAvg = average(entries.slice(-14, -7).map((e) => e.score));
  const thisWeekAvg = average(days.map((d) => d.score));
  const trendPct = previousWeekAvg > 0 ? Math.round(((thisWeekAvg - previousWeekAvg) / previousWeekAvg) * 100) : 0;

  return {
    points,
    score: latestScore,
    trendPct,
    insightsCount: days.filter((d) => d.score > 0).length,
  };
}

/** Builds the last 7 months, averaging all entries recorded within each month. */
export function buildMonthlyView(entries: DailyScoreEntry[]) {
  const today = new Date();
  const months: { key: string; label: string; avg: number }[] = [];

  for (let i = 6; i >= 0; i--) {
    const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
    const key = `${d.getFullYear()}-${d.getMonth()}`;
    const monthEntries = entries.filter((e) => {
      const ed = new Date(e.date);
      return ed.getFullYear() === d.getFullYear() && ed.getMonth() === d.getMonth();
    });
    months.push({ key, label: MONTH_LABELS[d.getMonth()], avg: average(monthEntries.map((e) => e.score)) });
  }

  const max = Math.max(...months.map((m) => m.avg), 1);
  const points: ScorePoint[] = months.map((m, i) => ({
    label: m.label,
    value: m.avg / max,
    highlight: i >= months.length - 2,
  }));

  const latestScore = months[months.length - 1]?.avg ?? 0;
  const previousAvg = months[months.length - 2]?.avg ?? 0;
  const trendPct = previousAvg > 0 ? Math.round(((latestScore - previousAvg) / previousAvg) * 100) : 0;

  return {
    points,
    score: latestScore,
    trendPct,
    insightsCount: months.filter((m) => m.avg > 0).length * 3,
  };
}