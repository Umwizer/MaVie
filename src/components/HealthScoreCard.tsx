import { useMemo, useState } from "react";
import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { DailyScoreEntry } from "../types/health";
import { buildWeeklyView, buildMonthlyView } from "../utils/scoreAggregation";

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
    <View className="w-full bg-card rounded-3xl p-6">
      <View className="flex-row justify-between items-center mb-1">
        <View className="flex-row items-center gap-2">
          <Ionicons name="sparkles" size={22} color="#2F6FED" />
          <Text className="text-textPrimary text-3xl font-bold">{view.score.toFixed(1)}</Text>
        </View>

        <View className="relative">
          <Pressable
            className="flex-row items-center gap-1.5 border border-navInactive rounded-full px-3.5 py-2"
            onPress={() => setMenuOpen((v) => !v)}
          >
            <Ionicons name="calendar-outline" size={14} color="#9AA3B2" />
            <Text className="text-textSecondary text-xs">{period}</Text>
            <Ionicons name="chevron-down" size={14} color="#9AA3B2" />
          </Pressable>

          {menuOpen && (
            <View className="absolute top-11 right-0 bg-card border border-navInactive rounded-xl overflow-hidden z-10 w-28">
              {(["Weekly", "Monthly"] as Period[]).map((p) => (
                <Pressable key={p} className="px-4 py-2.5" onPress={() => selectPeriod(p)}>
                  <Text
                    className={
                      p === period ? "text-primary text-xs font-semibold" : "text-textSecondary text-xs"
                    }
                  >
                    {p}
                  </Text>
                </Pressable>
              ))}
            </View>
          )}
        </View>
      </View>

      <Text className="text-textSecondary text-sm mb-6">Your Asklepios Score</Text>

      <View className="flex-row justify-between items-end h-28 mb-5">
        {view.points.map((point, i) => (
          <View key={i} className="items-center flex-1 gap-2">
            <View
              className={point.highlight ? "w-2.5 rounded-full bg-primaryLight" : "w-2.5 rounded-full bg-primary"}
              style={{ height: Math.max(96 * point.value, 4) }}
            />
            <Text className="text-navInactive text-[11px]">{point.label}</Text>
          </View>
        ))}
      </View>

      <View className="flex-row items-center gap-5">
        <View className="flex-row items-center gap-1.5">
          <Ionicons
            name={view.trendPct >= 0 ? "trending-up" : "trending-down"}
            size={16}
            color={view.trendPct >= 0 ? "#22C55E" : "#F43F5E"}
          />
          <Text className="text-textPrimary text-sm">{trendLabel}</Text>
        </View>
        <View className="flex-row items-center gap-1.5">
          <Ionicons name="bulb" size={16} color="#FBBF24" />
          <Text className="text-textPrimary text-sm">{view.insightsCount} insights</Text>
        </View>
      </View>
    </View>
  );
}