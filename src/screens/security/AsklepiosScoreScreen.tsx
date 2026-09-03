import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import type { RootStackParamList } from "../../navigation/types";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "AsklepiosScore"
>;

export default function AsklepiosScoreScreen({
  navigation,
  route,
}: Props) {
  const score = route.params?.score ?? 88;

  const isHealthy = score >= 80;
  const isAverage = score >= 50 && score < 80;

  const backgroundColor = isHealthy
    ? "#2864E8"
    : isAverage
    ? "#F59E0B"
    : "#F43F5E";

  const message = isHealthy
    ? "You are very healthy.\nLet's keep it that way!"
    : isAverage
    ? "Your health is within an\naverage range."
    : "You are unhealthy.\nScore is below optimal.";

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor },
      ]}
    >
      <View style={styles.content}>
        <Text style={styles.title}>
          Asklepios Score
        </Text>

        {/* SCORE */}
        <View style={styles.scoreArea}>
          <View style={styles.outerCircle}>
            <View style={styles.middleCircle}>
              <View style={styles.scoreCircle}>
                <Text
                  style={[
                    styles.score,
                    { color: backgroundColor },
                  ]}
                >
                  {Math.round(score)}
                </Text>
              </View>
            </View>
          </View>

          {/* Plus button */}
          <View
            style={[
              styles.plus,
              { backgroundColor },
            ]}
          >
            <Ionicons
              name="add"
              size={24}
              color="#FFFFFF"
            />
          </View>
        </View>

        <Text style={styles.message}>
          {message}
        </Text>

        {/* STATS */}
        <View style={styles.stats}>
          <View style={styles.stat}>
            <Ionicons
              name="heart"
              size={14}
              color="#FFFFFF"
            />

            <Text style={styles.statText}>
              3 Improvements
            </Text>
          </View>

          <View style={styles.stat}>
            <Ionicons
              name="sparkles"
              size={14}
              color="#FFFFFF"
            />

            <Text style={styles.statText}>
              5 Suggestions
            </Text>
          </View>
        </View>

        {/* DETAILS */}
        <Pressable
          style={styles.detailsButton}
          onPress={() =>
            navigation.navigate("AssessmentResult", {
              score,
            })
          }
        >
          <Text
            style={[
              styles.detailsText,
              { color: backgroundColor },
            ]}
          >
            See Details
          </Text>

          <Text
            style={[
              styles.detailsArrow,
              { color: backgroundColor },
            ]}
          >
            →
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 25,
    paddingTop: 25,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "700",
    marginTop: 5,
  },

  scoreArea: {
    width: 230,
    height: 255,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    marginTop: 35,
  },

  outerCircle: {
    width: 205,
    height: 205,
    borderRadius: 103,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
  },

  middleCircle: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "rgba(255,255,255,0.22)",
    alignItems: "center",
    justifyContent: "center",
  },

  scoreCircle: {
    width: 135,
    height: 135,
    borderRadius: 68,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  score: {
    fontSize: 47,
    fontWeight: "700",
  },

  plus: {
    position: "absolute",
    bottom: 18,
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 2,
    borderColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  message: {
    color: "#FFFFFF",
    fontSize: 16,
    lineHeight: 22,
    textAlign: "center",
    fontWeight: "500",
    marginTop: 10,
  },

  stats: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 25,
    marginTop: 17,
  },

  stat: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  statText: {
    color: "#FFFFFF",
    fontSize: 9,
  },

  detailsButton: {
    position: "absolute",
    left: 25,
    right: 25,
    bottom: 20,
    height: 45,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
  },

  detailsText: {
    fontSize: 12,
    fontWeight: "600",
  },

  detailsArrow: {
    fontSize: 17,
  },
});