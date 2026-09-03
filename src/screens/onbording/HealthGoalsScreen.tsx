// src/screens/onbording/HealthGoalsScreen.tsx

import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import type { RootStackParamList } from "../../navigation/types";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "HealthGoals"
>;

const HealthGoalsScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const systemColorScheme = useColorScheme();

  const [isDarkMode, setIsDarkMode] = useState(
    systemColorScheme === "dark"
  );

  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);

  const colors = isDarkMode
    ? {
        background: "#121212",
        textPrimary: "#FFFFFF",
        textSecondary: "#B0B0B0",
        line: "#333333",
        card: "#1E1E1E",
        cardBorder: "#333333",
        selectedCard: "#1A2A4A",
        primary: "#4A6FFF",
        disabled: "#333333",
        disabledText: "#666666",
      }
    : {
        background: "#FFFFFF",
        textPrimary: "#1A1A1A",
        textSecondary: "#666666",
        line: "#E0E0E0",
        card: "#F5F6FA",
        cardBorder: "#E0E0E0",
        selectedCard: "#E8EDFF",
        primary: "#4A6FFF",
        disabled: "#F0F0F0",
        disabledText: "#B0B0B0",
      };

  const healthGoals = [
    {
      id: "1",
      label: "Improve my overall health",
      icon: "💪",
    },
    {
      id: "2",
      label: "Track my health metrics",
      icon: "📊",
    },
    {
      id: "3",
      label: "Manage my meds",
      icon: "💊",
    },
    {
      id: "4",
      label: "I wanna try wellness AI assistant",
      icon: "🤖",
    },
    {
      id: "5",
      label: "I want to analyze activity",
      icon: "📈",
    },
    {
      id: "6",
      label: "Just wanna try the app",
      icon: "👋",
    },
  ];

  const handleSelectGoal = (goalId: string) => {
    setSelectedGoal((current) =>
      current === goalId ? null : goalId
    );
  };

  const handleContinue = () => {
    if (!selectedGoal) return;

    navigation.navigate("ProfileSetup");
  };

  const handleSkip = () => {
    navigation.navigate("ProfileSetup");
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
        },
      ]}
    >
      <StatusBar
        style={isDarkMode ? "light" : "dark"}
      />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.backText,
              { color: colors.textPrimary },
            ]}
          >
            ←
          </Text>
        </TouchableOpacity>

        <View
          style={[
            styles.headerLine,
            { backgroundColor: colors.line },
          ]}
        />

        <TouchableOpacity
          style={styles.skipButton}
          onPress={handleSkip}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.skipText,
              { color: colors.primary },
            ]}
          >
            Skip
          </Text>
        </TouchableOpacity>
      </View>

      {/* Theme toggle */}
      <View style={styles.themeContainer}>
        <TouchableOpacity
          style={styles.themeButton}
          onPress={() =>
            setIsDarkMode((current) => !current)
          }
          activeOpacity={0.7}
        >
          <Text style={styles.themeText}>
            {isDarkMode ? "☀️" : "🌙"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.flex}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <Text
            style={[
              styles.title,
              { color: colors.textPrimary },
            ]}
          >
            What is your health{"\n"}
            goal for the app?
          </Text>

          <View style={styles.options}>
            {healthGoals.map((goal) => {
              const selected =
                selectedGoal === goal.id;

              return (
                <TouchableOpacity
                  key={goal.id}
                  activeOpacity={0.7}
                  onPress={() =>
                    handleSelectGoal(goal.id)
                  }
                  style={[
                    styles.option,
                    {
                      backgroundColor: selected
                        ? colors.selectedCard
                        : colors.card,

                      borderColor: selected
                        ? colors.primary
                        : colors.cardBorder,
                    },
                  ]}
                >
                  <View style={styles.optionContent}>
                    <Text style={styles.optionIcon}>
                      {goal.icon}
                    </Text>

                    <Text
                      style={[
                        styles.optionLabel,
                        {
                          color: colors.textPrimary,
                        },
                      ]}
                    >
                      {goal.label}
                    </Text>
                  </View>

                  {selected && (
                    <View
                      style={[
                        styles.check,
                        {
                          backgroundColor:
                            colors.primary,
                        },
                      ]}
                    >
                      <Text style={styles.checkText}>
                        ✓
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>

        {/* Footer */}
        <View style={styles.footer}>
          <TouchableOpacity
            activeOpacity={0.8}
            disabled={!selectedGoal}
            onPress={handleContinue}
            style={[
              styles.continueButton,
              {
                backgroundColor: selectedGoal
                  ? colors.primary
                  : colors.disabled,
              },
            ]}
          >
            <Text
              style={[
                styles.continueText,
                {
                  color: selectedGoal
                    ? "#FFFFFF"
                    : colors.disabledText,
                },
              ]}
            >
              Continue →
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },

  flex: {
    flex: 1,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    paddingVertical: 8,
  },

  backButton: {
    padding: 8,
  },

  backText: {
    fontSize: 28,
    fontWeight: "300",
  },

  headerLine: {
    flex: 1,
    height: 1,
    marginHorizontal: 12,
  },

  skipButton: {
    paddingHorizontal: 8,
    paddingVertical: 8,
  },

  skipText: {
    fontSize: 16,
    fontWeight: "500",
  },

  themeContainer: {
    alignItems: "flex-end",
    paddingVertical: 4,
  },

  themeButton: {
    padding: 8,
  },

  themeText: {
    fontSize: 22,
  },

  scrollContent: {
    paddingTop: 10,
    paddingBottom: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "600",
    lineHeight: 36,
    marginBottom: 24,
  },

  options: {
    gap: 12,
  },

  option: {
    minHeight: 68,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 2,
  },

  optionContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },

  optionIcon: {
    fontSize: 22,
    marginRight: 14,
  },

  optionLabel: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
  },

  check: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },

  checkText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },

  footer: {
    paddingTop: 10,
    paddingBottom: 24,
  },

  continueButton: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    paddingVertical: 16,
  },

  continueText: {
    fontSize: 18,
    fontWeight: "600",
  },
});

export default HealthGoalsScreen;
