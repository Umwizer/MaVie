import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const BADGES = [
  { name: "Hydration Pal", icon: "water" as const, color: "#8B5CF6" },
  { name: "Health God", icon: "medkit" as const, color: "#2F6FED" },
  { name: "Steps Master", icon: "footsteps" as const, color: "#F59E0B" },
];

export default function AchievementBadgesVisual() {
  return (
    <View className="flex-1 w-full items-center justify-center">
      <View className="flex-row gap-3">
        {BADGES.map((b, i) => (
          <View
            key={b.name}
            className="bg-card rounded-2xl px-4 py-5 items-center gap-3 w-28"
            style={{ marginTop: i === 1 ? -16 : 16 }}
          >
            <View className="w-14 h-14 rounded-2xl items-center justify-center" style={{ backgroundColor: `${b.color}33` }}>
              <Ionicons name={b.icon} size={26} color={b.color} />
            </View>
            <View className="items-center">
              <Text className="text-textPrimary text-xs font-semibold text-center">{b.name}</Text>
              <Text className="text-textSecondary text-[10px]">Unlocked</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}