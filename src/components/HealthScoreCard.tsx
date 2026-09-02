import { useMemo, useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { DailyScoreEntry } from "../types/health";
import { buildWeeklyView, buildMonthlyView } from "../utils/scoreAggregation";
import { colors } from "../constants/theme"; // adjust path if needed

type Period = "Weekly" | "Monthly";

type Props = {
  entries: DailyScoreEntry[];
};

export default function HealthScoreCard({ entries }: Props) {
  const [period, setPeriod] = useState<Period>("Weekly");
  const [menuOpen, setMenuOpen] = useState(false);

  const view = useMemo(
    () => (period === "Weekly" ? buildWeeklyView(entries) : buildMonthlyView(entries)),
    [entries, period]
  );

  const selectPeriod = (p: Period) => {
    setPeriod(p);
    setMenuOpen(false);
  };

  const trendLabel =
    view.trendPct === 0
      ? "No change"
      : `${view.trendPct > 0 ? "+" : ""}${view.trendPct}% vs last ${period === "Weekly" ? "week" : "month"}`;

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.scoreRow}>
          <Ionicons name="sparkles" size={22} color={colors.primary} />
          <Text style={styles.scoreText}>{view.score.toFixed(1)}</Text>
        </View>

        <View style={styles.relative}>
          <Pressable style={styles.periodButton} onPress={() => setMenuOpen((v) => !v)}>
            <Ionicons name="calendar-outline" size={14} color={colors.textSecondary} />
            <Text style={styles.periodText}>{period}</Text>
            <Ionicons name="chevron-down" size={14} color={colors.textSecondary} />
          </Pressable>

          {menuOpen && (
            <View style={styles.dropdown}>
              {(["Weekly", "Monthly"] as Period[]).map((p) => (
                <Pressable key={p} style={styles.dropdownItem} onPress={() => selectPeriod(p)}>
                  <Text style={p === period ? styles.activePeriodText : styles.periodText}>
                    {p}
                  </Text>
                </Pressable>
              ))}
            </View>
          )}
        </View>
      </View>

      <Text style={styles.subtitle}>Your Asklepios Score</Text>

      {/* Chart */}
      <View style={styles.chart}>
        {view.points.map((point, i) => (
          <View key={i} style={styles.chartColumn}>
            <View
              style={[
                styles.bar,
                { 
                  height: Math.max(96 * point.value, 4),
                  backgroundColor: point.highlight ? colors.primaryLight : colors.primary
                }
              ]}
            />
            <Text style={styles.chartLabel}>{point.label}</Text>
          </View>
        ))}
      </View>

      {/* Footer stats */}
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Ionicons
            name={view.trendPct >= 0 ? "trending-up" : "trending-down"}
            size={16}
            color={view.trendPct >= 0 ? "#22C55E" : "#F43F5E"}
          />
          <Text style={styles.statText}>{trendLabel}</Text>
        </View>
        <View style={styles.statItem}>
          <Ionicons name="bulb" size={16} color="#FBBF24" />
          <Text style={styles.statText}>{view.insightsCount} insights</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    backgroundColor: colors.cardBackground,
    borderRadius: 24,
    padding: 24,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  scoreRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8, // if gap errors, use marginRight on Ionicons
  },
  scoreText: {
    color: colors.textPrimary,
    fontSize: 30,
    fontWeight: "700",
  },
  relative: {
    position: "relative",
  },
  periodButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderWidth: 1,
    borderColor: colors.navInactive,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  periodText: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  dropdown: {
    position: "absolute",
    top: 44,
    right: 0,
    backgroundColor: colors.cardBackground,
    borderWidth: 1,
    borderColor: colors.navInactive,
    borderRadius: 12,
    overflow: "hidden",
    zIndex: 10,
    width: 112,
  },
  dropdownItem: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  activePeriodText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: "600",
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: 14,
    marginBottom: 24,
  },
  chart: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: 112,
    marginBottom: 20,
  },
  chartColumn: {
    alignItems: "center",
    flex: 1,
    gap: 8,
  },
  bar: {
    width: 10,
    borderRadius: 8,
  },
  chartLabel: {
    color: colors.navInactive,
    fontSize: 11,
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  statText: {
    color: colors.textPrimary,
    fontSize: 14,
  },
});