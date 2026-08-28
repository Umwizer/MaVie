import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  icon: keyof typeof Ionicons.glyphMap;
  accent: string;
  caption: string;
};

export default function SlidesVisualCard({
  icon,
  accent,
  caption,
}: Props) {
  return (
    <View style={styles.card}>
      <View
        style={[
          styles.iconContainer,
          {
            backgroundColor: `${accent}22`,
          },
        ]}
      >
        <Ionicons name={icon} size={110} color={accent} />
      </View>

      <Text style={styles.caption}>{caption}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    width: "100%",
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 24,
    paddingHorizontal: 20,
  },

  iconContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },

  caption: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
    paddingHorizontal: 12,
    color: "#6B7280",
  },
});