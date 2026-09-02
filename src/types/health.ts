export type DailyScoreEntry = {
  date: string; // ISO date string, e.g. "2026-08-25"
  score: number; // 0–100, the raw health score for that day
};