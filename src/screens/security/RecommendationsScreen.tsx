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
  "Recommendations"
>;

export default function RecommendationsScreen({
  navigation,
}: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <Text style={styles.title}>
          Your Recommendations
        </Text>

        <Text style={styles.subtitle}>
          Personalized recommendations based on
          your assessment.
        </Text>

        <Recommendation
          icon="nutrition-outline"
          title="Improve Your Nutrition"
          description="Focus on balanced meals and nutrient-rich foods."
        />

        <Recommendation
          icon="water-outline"
          title="Stay Hydrated"
          description="Maintain healthy hydration throughout the day."
        />

        <Recommendation
          icon="walk-outline"
          title="Stay Active"
          description="Add regular movement and physical activity."
        />

        <Recommendation
          icon="moon-outline"
          title="Improve Your Sleep"
          description="Aim for a consistent and restful sleep schedule."
        />

        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("PersonalizedRecommendations")}
        >
          <Text style={styles.buttonText}>
            Continue to MaVie
          </Text>

          <Text style={styles.arrow}>
            →
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

function Recommendation({
  icon,
  title,
  description,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
}) {
  return (
    <View style={styles.card}>
      <View style={styles.iconContainer}>
        <Ionicons
          name={icon}
          size={23}
          color="#2864E8"
        />
      </View>

      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>
          {title}
        </Text>

        <Text style={styles.cardDescription}>
          {description}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020817",
  },

  content: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 21,
    fontWeight: "700",
    marginTop: 20,
  },

  subtitle: {
    color: "#98A2B3",
    fontSize: 10,
    lineHeight: 15,
    marginTop: 8,
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#0B1425",
    borderRadius: 11,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  iconContainer: {
    width: 45,
    height: 45,
    borderRadius: 23,
    backgroundColor: "#111F38",
    alignItems: "center",
    justifyContent: "center",
  },

  cardContent: {
    flex: 1,
    marginLeft: 12,
  },

  cardTitle: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },

  cardDescription: {
    color: "#98A2B3",
    fontSize: 9,
    lineHeight: 14,
    marginTop: 4,
  },

  button: {
    height: 45,
    borderRadius: 9,
    backgroundColor: "#2864E8",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    marginTop: 18,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },

  arrow: {
    color: "#FFFFFF",
    fontSize: 17,
  },
});