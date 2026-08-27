import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  icon: keyof typeof Ionicons.glyphMap;
  accent: string;
  caption: string;
};

export default function SlideVisualCard({ icon, accent, caption }: Props) {
  return (
    <View className="flex-1 w-full bg-card rounded-[28px] items-center justify-center py-6 px-5">
      <View
        className="w-[200px] h-[200px] rounded-full items-center justify-center mb-6"
        style={{ backgroundColor: `${accent}22` }}
      >
        <Ionicons name={icon} size={110} color={accent} />
      </View>

      <Text className="text-textSecondary text-sm text-center leading-5 px-3">
        {caption}
      </Text>
    </View>
  );
}