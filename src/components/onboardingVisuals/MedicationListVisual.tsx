import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function MedicationListVisual() {
  return (
    <View className="flex-1 w-full justify-center gap-3">
      <View className="bg-card rounded-2xl p-4 flex-row items-center gap-3">
        <View className="w-11 h-11 rounded-full bg-[#1E2740] items-center justify-center">
          <Ionicons name="shapes-outline" size={20} color="#9AA3B2" />
        </View>
        <View className="flex-1">
          <Text className="text-textPrimary text-sm font-semibold">Atorvaliq (atorvastatin)</Text>
          <Text className="text-textSecondary text-xs mb-1">3 tablets • Before Eating</Text>
          <View className="flex-row items-center gap-1">
            <Ionicons name="close-circle" size={14} color="#F43F5E" />
            <Text className="text-[#F43F5E] text-xs font-medium">Skipped</Text>
          </View>
        </View>
        <Ionicons name="chevron-forward" size={16} color="#9AA3B2" />
      </View>

      <View className="bg-card rounded-2xl p-4 gap-2">
        <View className="flex-row items-center gap-3">
          <View className="w-11 h-11 rounded-full bg-[#1E2740] items-center justify-center">
            <Ionicons name="ellipse-outline" size={20} color="#9AA3B2" />
          </View>
          <View className="flex-1">
            <Text className="text-textPrimary text-sm font-semibold">Amoxiciline</Text>
            <Text className="text-primary text-xs">1 tablet at 12:22 am</Text>
            <Text className="text-textSecondary text-xs">65mg • After Meal</Text>
          </View>
        </View>
        <View className="flex-row gap-2 mt-1">
          <Pressable className="flex-1 bg-[#1E2740] rounded-full py-2 items-center">
            <Text className="text-textSecondary text-xs font-medium">Skipped</Text>
          </Pressable>
          <Pressable className="flex-1 bg-primary rounded-full py-2 items-center">
            <Text className="text-white text-xs font-medium">Taken</Text>
          </Pressable>
        </View>
      </View>

      <View className="bg-card rounded-2xl p-4 flex-row items-center gap-3">
        <View className="w-11 h-11 rounded-full bg-[#1E2740] items-center justify-center">
          <Ionicons name="ellipse" size={20} color="#9AA3B2" />
        </View>
        <View className="flex-1">
          <Text className="text-textPrimary text-sm font-semibold">Ibuprofen</Text>
          <Text className="text-textSecondary text-xs mb-1">8 pills • Before Eating</Text>
          <View className="flex-row items-center gap-1">
            <Ionicons name="checkmark-circle" size={14} color="#22C55E" />
            <Text className="text-[#22C55E] text-xs font-medium">Taken</Text>
          </View>
        </View>
      </View>
    </View>
  );
}