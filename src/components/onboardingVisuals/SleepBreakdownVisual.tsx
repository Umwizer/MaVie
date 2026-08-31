import { View, Text } from "react-native";

const DOTS_FILLED = 8;
const DOTS_TOTAL = 14;

const STAGES = [
  { label: "Awake", pct: 11, time: "32m", color: "#F43F5E" },
  { label: "Post", pct: 18, time: "1h 3m", color: "#60A5FA" },
  { label: "Deep", pct: 21, time: "2h 33m", color: "#2F6FED" },
  { label: "Core", pct: 32, time: "3h 20m", color: "#3A4470" },
];

export default function SleepBreakdownVisual() {
  return (
    <View className="flex-1 w-full justify-center gap-3">
      <View className="bg-card rounded-2xl p-4">
        <Text className="text-textPrimary text-xl font-bold mb-3">9.1 <Text className="text-sm font-normal">hour</Text></Text>
        <View className="flex-row flex-wrap gap-1.5 mb-3">
          {Array.from({ length: DOTS_TOTAL }).map((_, i) => (
            <View key={i} className={i < DOTS_FILLED ? "w-2.5 h-2.5 rounded-full bg-primary" : "w-2.5 h-2.5 rounded-full bg-[#1E2740]"} />
          ))}
        </View>
        <Text className="text-textSecondary text-xs">Be sure to log your sleep metrics everyday!</Text>
      </View>

      <View className="bg-card rounded-2xl p-4 gap-3">
        {STAGES.map((s) => (
          <View key={s.label} className="flex-row items-center gap-3">
            <View className="rounded-full px-2.5 py-1" style={{ backgroundColor: s.color }}>
              <Text className="text-white text-[11px] font-bold">{s.pct}%</Text>
            </View>
            <Text className="text-textPrimary text-xs font-semibold flex-1">{s.label}</Text>
            <Text className="text-textSecondary text-xs">{s.time}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}