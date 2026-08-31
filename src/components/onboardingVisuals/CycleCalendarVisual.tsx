import { View, Text } from "react-native";

const HEADERS = ["S", "M", "T", "W", "T", "F", "S"];
const WEEKS = [
  [30, 31, 1, 2, 3, 4, 5],
  [6, 7, 8, 9, 10, 11, 12],
  [13, 14, 15, 16, 17, 18, 19],
  [20, 21, 22, 23, 24, 25, 26],
  [27, 28, 29, 30, 1, 2, 3],
];
const HIGHLIGHT_KEYS = ["1-9", "3-25"]; // "weekIndex-day"

export default function CycleCalendarVisual() {
  return (
    <View className="flex-1 w-full items-center justify-center">
      <View className="w-full bg-card rounded-[28px] p-5">
        <View className="flex-row justify-between mb-3">
          {HEADERS.map((h, i) => (
            <Text key={i} className="text-textSecondary text-xs w-8 text-center font-semibold">{h}</Text>
          ))}
        </View>
        {WEEKS.map((week, wi) => (
          <View key={wi} className="flex-row justify-between mb-2">
            {week.map((day, di) => {
              const isHighlighted = HIGHLIGHT_KEYS.includes(`${wi}-${day}`);
              const isMuted = (wi === 0 && di < 2) || (wi === 4 && di > 3);
              return (
                <View key={di} className="w-8 h-8 items-center justify-center">
                  <View className={isHighlighted ? "w-8 h-8 rounded-full items-center justify-center bg-primary" : "w-8 h-8 rounded-full items-center justify-center"}>
                    <Text className={isMuted ? "text-xs text-navInactive" : isHighlighted ? "text-xs text-white font-bold" : "text-xs text-textPrimary"}>
                      {day}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        ))}
      </View>

      <View className="absolute -bottom-4 -left-4 bg-[#F43F5E] rounded-full w-24 h-24 items-center justify-center">
        <Text className="text-white text-[10px] font-medium">Next period</Text>
        <Text className="text-white text-xl font-bold">27</Text>
      </View>
    </View>
  );
}