import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ChatCompanionVisual() {
  return (
    <View className="flex-1 w-full justify-center gap-3">
      <View className="self-end bg-primary rounded-2xl rounded-tr-sm px-4 py-3 max-w-[85%]">
        <Text className="text-white text-sm">Hi, how much water do I need to drink for today?</Text>
        <Text className="text-white/70 text-[10px] text-right mt-1">11:25</Text>
      </View>

      <View className="flex-row items-end gap-2 max-w-[90%]">
        <View className="w-8 h-8 rounded-full bg-card items-center justify-center">
          <Ionicons name="hardware-chip" size={16} color="#2F6FED" />
        </View>
        <View className="bg-card rounded-2xl rounded-tl-sm px-4 py-3 flex-1">
          <Text className="text-textPrimary text-sm">You're currently at 4 glasses — you need 4 more for today! Let's drink!</Text>
          <Text className="text-textSecondary text-[10px] text-right mt-1">11:25</Text>
        </View>
      </View>

      <View className="self-end bg-primary rounded-2xl rounded-tr-sm px-4 py-3 max-w-[85%]">
        <Text className="text-white text-sm">Wow, amazing! Thank you!</Text>
        <Text className="text-white/70 text-[10px] text-right mt-1">11:25</Text>
      </View>
    </View>
  );
}