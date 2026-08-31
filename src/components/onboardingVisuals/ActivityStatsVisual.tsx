import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ACTIVITIES = [
  { name: "Jogging", icon: "walk" as const, intensity: "Intense", color: "#F43F5E", intensityIcon: "heart" as const },
  { name: "Cycling", icon: "bicycle" as const, intensity: "Light", color: "#F59E0B", intensityIcon: "heart" as const },
  { name: "Yoga", icon: "body" as const, intensity: "Relax", color: "#22C55E", intensityIcon: "leaf" as const },
  { name: "Swimming", icon: "water" as const, intensity: "Intense", color: "#F43F5E", intensityIcon: "heart" as const },
];

export default function ActivityStatsVisual() {
  return (
    <View className="flex-1 w-full justify-center">
      <View className="flex-row flex-wrap justify-between gap-3">
        {ACTIVITIES.map((a) => (
          <View key={a.name} className="w-[47%] bg-card rounded-2xl p-4 mb-1">
            <Text className="text-textSecondary text-[11px] mb-3">asklepios</Text>
            <Ionicons name={a.icon} size={28} color="#FFFFFF" />
            <Text className="text-textPrimary text-base font-semibold mt-3 mb-1">{a.name}</Text>
            <View className="flex-row items-center gap-1">
              <Ionicons name={a.intensityIcon} size={12} color={a.color} />
              <Text style={{ color: a.color }} className="text-xs font-medium">{a.intensity}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}