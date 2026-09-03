import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import type { RootStackParamList } from "../../navigation/types";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "AsklepiosPlus"
>;

const features = [
  "Personalized health insights",
  "Daily wellness recommendations",
  "Comprehensive sleep insights",
  "Track your health daily",
  "Mood and stress management tools",
  "Nutrition coaching with smart suggestions",
  "Sleep and activity monitoring",
  "Easy-to-use symptom checker",
];

export default function AsklepiosPlusScreen({
  navigation,
}: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* BACK */}

        <Pressable
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name="chevron-back"
            size={18}
            color="#98A2B3"
          />
        </Pressable>

        {/* LOGO */}

        <View style={styles.logoRow}>
          <Ionicons
            name="add"
            size={27}
            color="#2864E8"
          />

          <Text style={styles.logoText}>
            asklepios
            <Text style={styles.logoPlus}>
              plus
            </Text>
          </Text>
        </View>

        <Text style={styles.subtitle}>
          Try our full 1-week plan for free.
        </Text>

        {/* FEATURES */}

        <View style={styles.featureList}>
          {features.map((feature) => (
            <View
              key={feature}
              style={styles.featureRow}
            >
              <View style={styles.checkCircle}>
                <Ionicons
                  name="checkmark"
                  size={9}
                  color="#FFFFFF"
                />
              </View>

              <Text style={styles.featureText}>
                {feature}
              </Text>
            </View>
          ))}
        </View>

        {/* BUTTON */}

        <Pressable
          style={styles.button}
          onPress={() =>
            navigation.navigate("FreeTrialDetails")
          }
        >
          <Text style={styles.buttonText}>
            Start Free Trial
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020817",
  },

  content: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },

  backButton: {
    width: 35,
    height: 35,
    justifyContent: "center",
  },

  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },

  logoText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "400",
  },

  logoPlus: {
    color: "#FFFFFF",
    fontWeight: "700",
  },

  subtitle: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "600",
    marginTop: 25,
    marginBottom: 15,
  },

  featureList: {
    marginBottom: 18,
  },

  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 9,
  },

  checkCircle: {
    width: 13,
    height: 13,
    borderRadius: 7,
    backgroundColor: "#2864E8",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 7,
  },

  featureText: {
    flex: 1,
    color: "#98A2B3",
    fontSize: 8,
    lineHeight: 11,
  },

  button: {
    height: 44,
    borderRadius: 8,
    backgroundColor: "#2864E8",
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "600",
  },
});