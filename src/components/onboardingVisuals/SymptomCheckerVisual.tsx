import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const RESULTS = [
  { name: "Tension Headache", match: 80, risk: "High Risk", riskColor: "#F43F5E", barColor: "#F43F5E", icon: "person" as const, iconBg: "#4C1D2E" },
  { name: "Influenza Type A", match: 80, risk: "Mild Risk", riskColor: "#F59E0B", barColor: "#F59E0B", icon: "medkit" as const, iconBg: "#4A2E12" },
];

export default function SymptomCheckerVisual() {
  return (
    <View className="flex-1 w-full justify-center gap-3">
      {RESULTS.map((r) => (
        <View key={r.name} className="bg-card rounded-2xl p-4">
          <View className="flex-row items-center justify-between mb-3">
            <View className="flex-row items-center gap-3">
              <View className="w-10 h-10 rounded-full items-center justify-center" style={{ backgroundColor: r.iconBg }}>
                <Ionicons name={r.icon} size={18} color={r.barColor} />
              </View>
              <Text className="text-textPrimary text-sm font-semibold">{r.name}</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#9AA3B2" />
          </View>

          <View className="h-1.5 rounded-full bg-[#1E2740] mb-3">
            <View className="h-full rounded-full" style={{ width: `${r.match}%`, backgroundColor: r.barColor }} />
          </View>

          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-1.5">
              <Ionicons name="sparkles" size={12} color="#9AA3B2" />
              <Text className="text-textSecondary text-xs">{r.match}% Match</Text>
            </View>
            <View className="flex-row items-center gap-1.5">
              <View className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: r.riskColor }} />
              <Text className="text-xs" style={{ color: r.riskColor }}>{r.risk}</Text>
            </View>
          </View>
          <Text className="text-textSecondary text-xs mt-2">2 suggestion • Treatable</Text>
        </View>
      ))}
    </View>
  );
}