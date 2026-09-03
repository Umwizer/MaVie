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
  "AssessmentResult"
>;

export default function AssessmentResultScreen({
  navigation,
  route,
}: Props) {
  const score = route.params?.score ?? 61.2;

  const risk =
    score >= 70
      ? "Low Risk"
      : score >= 50
      ? "Mild Risk"
      : "High Risk";

  const riskDescription =
    score >= 70
      ? "Your assessment indicates a healthy range."
      : score >= 50
      ? "Mild vitamin deficiency or slight increase in cholesterol."
      : "Your assessment indicates areas that need attention.";

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* HEADER */}
        <Text style={styles.title}>
          Your Assessment Result
        </Text>

        {/* GAUGE */}
        <View style={styles.gaugeContainer}>
          <View style={styles.gauge}>
            <View style={styles.gaugeBackground} />

            <View
              style={[
                styles.gaugeProgress,
                {
                  transform: [
                    {
                      rotate: `${-90 + (score / 100) * 180}deg`,
                    },
                  ],
                },
              ]}
            />

            <View
              style={[
                styles.gaugeDot,
                {
                  transform: [
                    {
                      rotate: `${-90 + (score / 100) * 180}deg`,
                    },
                  ],
                },
              ]}
            />

            <View style={styles.gaugeCenter}>
              <Text style={styles.scoreText}>
                {score.toFixed(1)}
              </Text>

              <Text style={styles.riskText}>
                {risk}
              </Text>
            </View>
          </View>
        </View>

        {/* CONFIDENCE */}
        <View style={styles.confidence}>
          <Ionicons
            name="shield-checkmark"
            size={13}
            color="#98A2B3"
          />

          <Text style={styles.confidenceText}>
            99.9% Confidence
          </Text>
        </View>

        {/* SUMMARY */}
        <Text style={styles.summary}>
          {riskDescription}
        </Text>

        <Text style={styles.explanation}>
          Based on your assessment, our system has
          identified the following areas that may
          benefit from additional attention.
        </Text>

        {/* RISK RANGE */}
        <Text style={styles.sectionTitle}>
          Score Range
        </Text>

        <View style={styles.rangeCard}>
          <RangeRow
            color="#F43F5E"
            range="10 - 20"
            label="Critical Health"
          />

          <RangeRow
            color="#F59E0B"
            range="20 - 50"
            label="Bad Health"
          />

          <RangeRow
            color="#2864E8"
            range="50 - 70"
            label="Mild Risk"
          />

          <RangeRow
            color="#12B76A"
            range="70 - 100"
            label="Good Health"
          />
        </View>

        {/* BODY COMPOSITION */}
        <Text style={styles.sectionTitle}>
          Body Composition
        </Text>

        <View style={styles.bodyCard}>
          <View style={styles.profileRow}>
            <View style={styles.avatar}>
              <Ionicons
                name="person"
                size={20}
                color="#98A2B3"
              />
            </View>

            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>
                Your Profile
              </Text>

              <View style={styles.healthStatus}>
                <View style={styles.greenDot} />

                <Text style={styles.healthText}>
                  Good Physique
                </Text>
              </View>
            </View>

            <Ionicons
              name="share-outline"
              size={18}
              color="#98A2B3"
            />
          </View>

          <View style={styles.profileDivider} />

          <View style={styles.measurements}>
            <Measurement
              title="Fat"
              value="15.3%"
            />

            <Measurement
              title="Weight"
              value="65kg"
            />

            <Measurement
              title="Muscle"
              value="77%"
            />
          </View>
        </View>

        {/* RECOMMENDATIONS */}
        <Pressable
          style={styles.recommendButton}
          onPress={() =>
            navigation.navigate("Recommendations")
          }
        >
          <Text style={styles.recommendText}>
            See Recommendations
          </Text>

          <Text style={styles.arrow}>
            →
          </Text>
        </Pressable>

        <Pressable
          style={styles.feedbackButton}
          onPress={() => {}}
        >
          <Text style={styles.feedbackText}>
            How do we get it right?
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

function RangeRow({
  color,
  range,
  label,
}: {
  color: string;
  range: string;
  label: string;
}) {
  return (
    <View style={styles.rangeRow}>
      <View
        style={[
          styles.rangeDot,
          { backgroundColor: color },
        ]}
      />

      <Text style={styles.rangeText}>
        {range}
      </Text>

      <Text style={styles.rangeLabel}>
        {label}
      </Text>
    </View>
  );
}

function Measurement({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <View style={styles.measurement}>
      <Text style={styles.measurementTitle}>
        {title}
      </Text>

      <Text style={styles.measurementValue}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020817",
  },

  content: {
    paddingHorizontal: 14,
    paddingBottom: 25,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 19,
    fontWeight: "700",
    marginTop: 15,
    marginBottom: 15,
  },

  gaugeContainer: {
    height: 175,
    alignItems: "center",
    justifyContent: "center",
  },

  gauge: {
    width: 210,
    height: 115,
    position: "relative",
    overflow: "hidden",
  },

  gaugeBackground: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 9,
    borderColor: "#243247",
    borderBottomColor: "transparent",
    transform: [{ rotate: "-45deg" }],
    top: 30,
  },

  gaugeProgress: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 9,
    borderColor: "#F59E0B",
    borderBottomColor: "transparent",
    top: 30,
    left: 5,
  },

  gaugeDot: {
    position: "absolute",
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#F59E0B",
    top: 20,
    right: 45,
  },

  gaugeCenter: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 3,
    alignItems: "center",
  },

  scoreText: {
    color: "#FFFFFF",
    fontSize: 34,
    fontWeight: "700",
  },

  riskText: {
    color: "#98A2B3",
    fontSize: 10,
    marginTop: 2,
  },

  confidence: {
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    borderWidth: 1,
    borderColor: "#273244",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },

  confidenceText: {
    color: "#98A2B3",
    fontSize: 8,
  },

  summary: {
    color: "#FFFFFF",
    fontSize: 14,
    lineHeight: 19,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 17,
  },

  explanation: {
    color: "#98A2B3",
    fontSize: 9,
    lineHeight: 14,
    textAlign: "center",
    marginTop: 9,
    marginBottom: 15,
  },

  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 8,
  },

  rangeCard: {
    backgroundColor: "#0B1425",
    borderRadius: 10,
    padding: 8,
    marginBottom: 16,
  },

  rangeRow: {
    height: 34,
    backgroundColor: "#111C30",
    borderRadius: 7,
    marginBottom: 5,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },

  rangeDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    marginRight: 8,
  },

  rangeText: {
    color: "#98A2B3",
    fontSize: 9,
    width: 55,
  },

  rangeLabel: {
    color: "#FFFFFF",
    fontSize: 9,
    flex: 1,
    textAlign: "right",
  },

  bodyCard: {
    backgroundColor: "#0B1425",
    borderRadius: 10,
    padding: 11,
    marginBottom: 16,
  },

  profileRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 37,
    height: 37,
    borderRadius: 19,
    backgroundColor: "#253044",
    alignItems: "center",
    justifyContent: "center",
  },

  profileInfo: {
    flex: 1,
    marginLeft: 9,
  },

  profileName: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "600",
  },

  healthStatus: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },

  greenDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#12B76A",
    marginRight: 5,
  },

  healthText: {
    color: "#98A2B3",
    fontSize: 8,
  },

  profileDivider: {
    height: 1,
    backgroundColor: "#1F2A3D",
    marginVertical: 10,
  },

  measurements: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  measurement: {
    width: "30%",
  },

  measurementTitle: {
    color: "#98A2B3",
    fontSize: 8,
  },

  measurementValue: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "600",
    marginTop: 3,
  },

  recommendButton: {
    height: 44,
    borderRadius: 8,
    backgroundColor: "#2864E8",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
  },

  recommendText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "600",
  },

  arrow: {
    color: "#FFFFFF",
    fontSize: 17,
  },

  feedbackButton: {
    alignItems: "center",
    paddingVertical: 14,
  },

  feedbackText: {
    color: "#2864E8",
    fontSize: 9,
  },
});