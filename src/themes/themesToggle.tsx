import React from "react";
import {
  Pressable,
  Text,
  StyleSheet,
  useColorScheme,
} from "react-native";
import { Feather } from "@expo/vector-icons";

export default function ThemeToggle() {
  const colorScheme = useColorScheme();

  const isDark = colorScheme === "dark";

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        isDark ? styles.darkContainer : styles.lightContainer,
        pressed && styles.pressed,
      ]}
      accessibilityRole="button"
      accessibilityLabel={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <Feather
        name={isDark ? "moon" : "sun"}
        size={16}
        color={isDark ? "#9AA0B4" : "#5B6072"}
      />

      <Text
        style={[
          styles.text,
          isDark ? styles.darkText : styles.lightText,
        ]}
      >
        {isDark ? "Dark" : "Light"}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },

  lightContainer: {
    backgroundColor: "#F3F4F6",
  },

  darkContainer: {
    backgroundColor: "#1F2937",
  },

  pressed: {
    opacity: 0.7,
  },

  text: {
    fontSize: 12,
    fontWeight: "500",
  },

  lightText: {
    color: "#374151",
  },

  darkText: {
    color: "#D1D5DB",
  },
});