import { Ionicons } from "@expo/vector-icons";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import type { RootStackParamList } from "../../navigation/types";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "ChooseAvatar"
>;

const STEPS = [
  "Account Info",
  "Personal Info",
  "Choose Plan",
];

export default function ProfileSetupScreen({
  navigation,
}: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      {/* ================= STEPS ================= */}

      <View style={styles.stepsContainer}>
        {STEPS.map((step, index) => {
          const isActive = index === 0;
          const isLast =
            index === STEPS.length - 1;

          return (
            <View
              key={step}
              style={styles.stepWrapper}
            >
              {/* Dot */}
              <View style={styles.stepDotContainer}>
                <View
                  style={[
                    styles.stepDot,
                    isActive
                      ? styles.stepDotActive
                      : styles.stepDotInactive,
                  ]}
                />

                {/* Step label */}
                <Text
                  style={[
                    styles.stepLabel,
                    isActive
                      ? styles.stepLabelActive
                      : styles.stepLabelInactive,
                  ]}
                >
                  {step}
                </Text>
              </View>

              {/* Line */}
              {!isLast && (
                <View style={styles.progressLine}>
                  {index === 0 && (
                    <View
                      style={styles.progressLineActive}
                    />
                  )}
                </View>
              )}
            </View>
          );
        })}
      </View>

      {/* ================= MAIN CONTENT ================= */}

      <View style={styles.content}>
        {/* Icon */}

        <View style={styles.iconContainer}>
          <View style={styles.iconCircle} />

          <Ionicons
            name="add"
            size={56}
            color="#2F6FED"
          />
        </View>

        {/* Title */}

        <Text style={styles.title}>
          Let's Set Up Your Profile{"\n"}
          & Security
        </Text>

        {/* Description */}

        <Text style={styles.description}>
          Your health journey is very important,
          and we don't want it to be a mystery.
        </Text>
      </View>

      {/* ================= BUTTONS ================= */}

      <View style={styles.footer}>
        {/* I'm Ready */}

        <Pressable
          style={({ pressed }) => [
            styles.primaryButton,
            pressed &&
              styles.buttonPressed,
          ]}
          onPress={() =>
            navigation.replace(
              "ChooseAvatar"
            )
          }
        >
          <View style={styles.primaryButtonContent}>
            <Text style={styles.primaryButtonText}>
              I'm Ready
            </Text>

            <Ionicons
              name="arrow-forward"
              size={14}
              color="#FFFFFF"
            />
          </View>
        </Pressable>

        {/* I'll do it later */}

        <Pressable
          style={({ pressed }) => [
            styles.laterButton,
            pressed &&
              styles.laterButtonPressed,
          ]}
          onPress={() =>
            navigation.replace(
              "ChooseAvatar"
            )
          }
        >
          <View style={styles.laterButtonContent}>
            <Ionicons
              name="calendar-outline"
              size={13}
              color="#2F6FED"
            />

            <Text style={styles.laterButtonText}>
              I'll do it later
            </Text>
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

/* =====================================================
   STYLES
===================================================== */

const styles = StyleSheet.create({
  /* ================= CONTAINER ================= */

  container: {
    flex: 1,
    backgroundColor: "#121212",
    paddingHorizontal: 16,
  },

  /* ================= STEPS ================= */

  stepsContainer: {
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
  },

  stepWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },

  stepDotContainer: {
    alignItems: "center",
  },

  stepDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
  },

  stepDotActive: {
    backgroundColor: "#2F6FED",
  },

  stepDotInactive: {
    backgroundColor: "#252525",
  },

  stepLabel: {
    position: "absolute",
    top: 20,
    width: 96,
    textAlign: "center",
    fontSize: 9,
  },

  stepLabelActive: {
    color: "#FFFFFF",
  },

  stepLabelInactive: {
    color: "#8A8A8A",
  },

  /* ================= PROGRESS LINE ================= */

  progressLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#333333",
    marginHorizontal: 4,
  },

  progressLineActive: {
    width: "50%",
    height: 1,
    backgroundColor: "#2F6FED",
  },

  /* ================= CONTENT ================= */

  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  /* ================= ICON ================= */

  iconContainer: {
    width: 80,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 36,
  },

  iconCircle: {
    position: "absolute",
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "rgba(47, 111, 237, 0.20)",
  },

  /* ================= TITLE ================= */

  title: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 17,
    fontWeight: "600",
    lineHeight: 24,
  },

  /* ================= DESCRIPTION ================= */

  description: {
    marginTop: 20,
    maxWidth: 280,
    color: "#8A8A8A",
    textAlign: "center",
    fontSize: 11,
    lineHeight: 16,
  },

  /* ================= FOOTER ================= */

  footer: {
    paddingBottom: 20,
  },

  /* ================= PRIMARY BUTTON ================= */

  primaryButton: {
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    backgroundColor: "#2F6FED",
  },

  buttonPressed: {
    opacity: 0.8,
  },

  primaryButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },

  /* ================= LATER BUTTON ================= */

  laterButton: {
    height: 32,
    marginTop: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  laterButtonPressed: {
    opacity: 0.7,
  },

  laterButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  laterButtonText: {
    color: "#2F6FED",
    fontSize: 12,
    fontWeight: "500",
  },
});
