import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const MACROS = [
  { label: "Carb", value: "35/77g", color: "#F59E0B", pct: 0.45 },
  { label: "Fiber", value: "35/77g", color: "#22C55E", pct: 0.45 },
  { label: "Fat", value: "35/77g", color: "#F43F5E", pct: 0.45 },
];

export default function NutritionRingVisual() {
  return (
    <View className="flex-1 w-full justify-center gap-3">
      <View className="bg-card rounded-2xl p-5 flex-row items-center justify-between">
        <View className="items-center gap-2">
          <View className="w-8 h-8 rounded-full bg-[#1E2740] items-center justify-center">
            <Ionicons name="checkmark" size={16} color="#FFFFFF" />
          </View>
          <Text className="text-textPrimary text-lg font-bold">656</Text>
          <Text className="text-textSecondary text-xs">Consumed</Text>
        </View>

        <View className="w-28 h-28 rounded-full border-4 border-[#1E2740] items-center justify-center">
          <View
            className="absolute w-28 h-28 rounded-full border-4 border-primary"
            style={{ borderLeftColor: "transparent", borderBottomColor: "transparent", transform: [{ rotate: "45deg" }] }}
          />
          <Text className="text-textPrimary text-xl font-bold">584</Text>
          <Text className="text-textSecondary text-[10px]">Remaining</Text>
        </View>

        <View className="items-center gap-2">
          <Ionicons name="locate" size={20} color="#9AA3B2" />
          <Text className="text-textPrimary text-lg font-bold">1220</Text>
          <Text className="text-textSecondary text-xs">Target</Text>
        </View>
      </View>

      <View className="bg-card rounded-2xl p-4 flex-row justify-between">
        {MACROS.map((m) => (
          <View key={m.label} className="items-center flex-1">
            <Text className="text-textSecondary text-xs mb-2">{m.label}</Text>
            <View className="w-full h-1.5 rounded-full bg-[#1E2740] mb-2">
              <View className="h-full rounded-full" style={{ width: `${m.pct * 100}%`, backgroundColor: m.color }} />
            </View>
            <Text className="text-textPrimary text-[11px]">{m.value}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}