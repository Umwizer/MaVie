import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function VirtualCareVisual() {
  return (
    <View className="flex-1 w-full items-center justify-center">
      <View className="w-full max-w-[260px] bg-card rounded-[32px] p-5 items-center relative">
        <Text className="text-textPrimary text-base font-semibold mt-2">Dr. Hannah Lector</Text>
        <Text className="text-textSecondary text-xs mb-4">Certified Psychiatrist</Text>

        <View className="w-full h-48 rounded-2xl bg-background items-center justify-center mb-2">
          <Ionicons name="person" size={72} color="#3A4256" />
        </View>

        <View className="absolute -left-4 top-16 w-14 h-14 rounded-full bg-primary items-center justify-center">
          <Ionicons name="call" size={22} color="#FFFFFF" />
        </View>

        <View className="absolute -right-6 bottom-14 bg-[#22C55E] rounded-full px-4 py-2 flex-row items-center gap-1.5">
          <Ionicons name="hand-left" size={14} color="#FFFFFF" />
          <Text className="text-white text-xs font-semibold">One Tap Book</Text>
        </View>
      </View>
    </View>
  );
}