import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const DAYS = ["M", "T", "W", "T", "F", "S", "S"];
const HEART_WAVE = [0.6, 0.9, 0.5, 0.8, 0.4, 0.7, 0.3];
const WATER_BARS = [0.9, 0.6, 0.7, 0.5, 0.8, 0.4, 0.6];
const SLEEP_LOGGED = [true, false, true, true, false, true, false];

export default function MetricsCollageVisual() {
  return (
    <View className="flex-1 w-full justify-center gap-3">
      <View className="bg-card rounded-2xl p-4">
        <View className="flex-row justify-between items-center mb-3">
          <Ionicons name="heart" size={20} color="#F43F5E" />
          <View className="flex-row items-center gap-1">
            <Text className="text-textSecondary text-xs">Today</Text>
            <Ionicons name="chevron-forward" size={12} color="#9AA3B2" />
          </View>
        </View>
        <View className="flex-row items-end justify-between">
          <View>
            <Text className="text-textPrimary text-2xl font-bold">72<Text className="text-sm font-normal"> bpm</Text></Text>
            <Text className="text-textSecondary text-xs mt-1">Resting Rate</Text>
          </View>
          <View className="flex-row items-end gap-1 h-10">
            {HEART_WAVE.map((h, i) => (
              <View key={i} className="w-1 rounded-full bg-[#F43F5E]" style={{ height: 36 * h, opacity: 0.5 + h * 0.5 }} />
            ))}
          </View>
        </View>
      </View>

      <View className="bg-card rounded-2xl p-4">
        <View className="flex-row justify-between items-center mb-3">
          <Ionicons name="moon" size={20} color="#8B5CF6" />
          <View className="flex-row items-center gap-1">
            <Text className="text-textSecondary text-xs">Today</Text>
            <Ionicons name="chevron-forward" size={12} color="#9AA3B2" />
          </View>
        </View>
        <Text className="text-textPrimary text-2xl font-bold">8.2<Text className="text-sm font-normal"> hr</Text></Text>
        <Text className="text-textSecondary text-xs mb-3">Well-rested</Text>
        <View className="flex-row justify-between">
          {SLEEP_LOGGED.map((logged, i) => (
            <View key={i} className="items-center gap-1">
              <View className={logged ? "w-6 h-6 rounded-full items-center justify-center bg-[#8B5CF6]" : "w-6 h-6 rounded-full items-center justify-center bg-[#1E2740]"}>
                {logged && <Ionicons name="checkmark" size={12} color="#FFFFFF" />}
              </View>
              <Text className="text-navInactive text-[10px]">{DAYS[i]}</Text>
            </View>
          ))}
        </View>
      </View>

      <View className="bg-card rounded-2xl p-4">
        <View className="flex-row justify-between items-center mb-3">
          <Ionicons name="water" size={20} color="#2F6FED" />
          <View className="flex-row items-center gap-1">
            <Text className="text-textSecondary text-xs">Today</Text>
            <Ionicons name="chevron-forward" size={12} color="#9AA3B2" />
          </View>
        </View>
        <View className="flex-row items-end justify-between">
          <View>
            <Text className="text-textPrimary text-2xl font-bold">2,125<Text className="text-sm font-normal"> ml</Text></Text>
            <Text className="text-textSecondary text-xs mt-1">On Track</Text>
          </View>
          <View className="flex-row items-end gap-1.5 h-10">
            {WATER_BARS.map((h, i) => (
              <View key={i} className="w-1.5 rounded-full bg-primary" style={{ height: 36 * h }} />
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}