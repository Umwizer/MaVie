import type { DailyScoreEntry } from "../types/health";

// Placeholder data so the UI has something to render. Replace this with
// real entries once you decide how the Asklepios Score gets calculated —
// the HealthScoreCard component itself doesn't need to change either way.
function generateMockEntries(days: number): DailyScoreEntry[] {
  const entries: DailyScoreEntry[] = [];
  const today = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    entries.push({
      date: d.toISOString().slice(0, 10),
      score: 60 + Math.round(Math.random() * 35), // random-ish 60-95 range
    });
  }

  return entries;
}

export const MOCK_SCORE_ENTRIES: DailyScoreEntry[] = generateMockEntries(240);