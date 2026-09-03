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
  "PersonalizedRecommendations"
>;

export default function PersonalizedRecommendationsScreen({
  navigation,
}: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.headerPlus}>
            <Ionicons
              name="add"
              size={23}
              color="#2864E8"
            />
          </View>

          <Text style={styles.title}>
            Our Personalized
            {"\n"}
            Recommendation
          </Text>
        </View>

        {/* SUGGESTED ACTIVITY */}
        <SectionHeader
          title="Suggested Activity"
          action="See All"
        />

        <View style={styles.activityCard}>
          <ActivityRow
            icon="walk-outline"
            title="Jogging"
            subtitle="3-5 times weekly"
            duration="30m"
          />

          <ActivityRow
            icon="water-outline"
            title="Swimming"
            subtitle="2-3 times weekly"
            duration="15m"
          />

          <ActivityRow
            icon="bicycle-outline"
            title="Biking"
            subtitle="1-2 times weekly"
            duration="60m"
          />

          <Pressable style={styles.seeAllButton}>
            <Text style={styles.seeAllText}>
              See All
            </Text>
          </Pressable>
        </View>

        {/* NUTRITION */}
        <SectionHeader
          title="Nutrition"
          action="See All"
        />

        <View style={styles.nutritionCard}>
          <View style={styles.calorieCircle}>
            <View style={styles.calorieInner}>
              <Text style={styles.calorieValue}>
                2,158
              </Text>

              <Text style={styles.calorieUnit}>
                kcal/day
              </Text>
            </View>

            <View
              style={[
                styles.arc,
                styles.arcBlue,
              ]}
            />

            <View
              style={[
                styles.arc,
                styles.arcGreen,
              ]}
            />

            <View
              style={[
                styles.arc,
                styles.arcOrange,
              ]}
            />
          </View>

          <View style={styles.nutritionLegend}>
            <LegendDot
              color="#2864E8"
              text="Protein"
            />

            <LegendDot
              color="#12B76A"
              text="Carbs"
            />

            <LegendDot
              color="#F59E0B"
              text="Fats"
            />
          </View>

          <Text style={styles.balancedTitle}>
            Balanced
          </Text>

          <Text style={styles.nutritionDescription}>
            A healthy balance of calories, protein,
            carbohydrates and fats to support your
            daily goals.
          </Text>

          <FoodRow
            emoji="🥬"
            title="Vegetables"
            subtitle="Vitamin A, C, K"
          />

          <FoodRow
            emoji="🍓"
            title="Berries"
            subtitle="Vitamin C, antioxidants"
          />

          <Pressable style={styles.moreButton}>
            <Text style={styles.moreButtonText}>
              See More Foods
            </Text>

            <Ionicons
              name="chevron-forward"
              size={13}
              color="#2864E8"
            />
          </Pressable>
        </View>

        {/* BLOOD PRESSURE */}
        <SectionHeader
          title="Blood Pressure"
          action="See All"
        />

        <View style={styles.bloodCard}>
          <Text style={styles.normalRange}>
            Normal Range
          </Text>

          <Text style={styles.bloodValue}>
            120/80 mmHg
          </Text>

          <View style={styles.sliderContainer}>
            <View style={styles.sliderTrack} />

            <View style={styles.sliderActive} />

            <View
              style={[
                styles.sliderPoint,
                styles.pointOne,
              ]}
            />

            <View
              style={[
                styles.sliderPoint,
                styles.pointTwo,
              ]}
            />
          </View>

          <Text style={styles.bloodDescription}>
            Your blood pressure is within the normal
            range. Continue with your healthy habits
            and regular monitoring.
          </Text>

          <Pressable style={styles.moreButton}>
            <Text style={styles.moreButtonText}>
              See Blood Pressure Tips
            </Text>

            <Ionicons
              name="chevron-forward"
              size={13}
              color="#2864E8"
            />
          </Pressable>
        </View>

        {/* SLEEP */}
        <SectionHeader
          title="Sleep"
          action="See All"
        />

        <View style={styles.sleepCard}>
          <Text style={styles.sleepStatus}>
            Amnesiac
          </Text>

          <Text style={styles.sleepSubtitle}>
            Sleep quality
          </Text>

          {/* GRAPH */}
          <View style={styles.chart}>
            <View style={styles.chartLine1} />
            <View style={styles.chartLine2} />
            <View style={styles.chartLine3} />

            <View style={styles.graphLine} />

            <View style={styles.days}>
              <Text>Mon</Text>
              <Text>Tue</Text>
              <Text>Wed</Text>
              <Text>Thu</Text>
              <Text>Fri</Text>
              <Text>Sat</Text>
              <Text>Sun</Text>
            </View>
          </View>

          <Text style={styles.sleepDescription}>
            Your sleep patterns suggest that improving
            your sleep consistency could help support
            your overall health.
          </Text>

          <Pressable style={styles.moreButton}>
            <Text style={styles.moreButtonText}>
              See Sleep Recommendations
            </Text>

            <Ionicons
              name="chevron-forward"
              size={13}
              color="#2864E8"
            />
          </Pressable>
        </View>

        {/* OTHER RESOURCES */}
        <SectionHeader
          title="Other Resources"
          action="See All"
        />

        <View style={styles.resourcesCard}>
          <ResourceRow
            emoji="🥗"
            title="Improving your health in one"
            subtitle="simple step"
          />

          <ResourceRow
            emoji="😴"
            title="How to improve"
            subtitle="your sleep"
          />

          <ResourceRow
            emoji="🍎"
            title="Understanding your health"
            subtitle="metrics for beginners"
          />

          <Pressable style={styles.resourcesButton}>
            <Text style={styles.moreButtonText}>
              See More Resources
            </Text>

            <Ionicons
              name="chevron-forward"
              size={13}
              color="#2864E8"
            />
          </Pressable>
        </View>

        {/* CONTINUE */}
        <Pressable
          style={styles.continueButton}
          onPress={() => navigation.navigate("PickPlan")}
        >
          <Text style={styles.continueText}>
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

/* ---------------------------------- */
/* SECTION HEADER */
/* ---------------------------------- */

function SectionHeader({
  title,
  action,
}: {
  title: string;
  action: string;
}) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>
        {title}
      </Text>

      <Pressable>
        <Text style={styles.sectionAction}>
          {action}
        </Text>
      </Pressable>
    </View>
  );
}

/* ---------------------------------- */
/* ACTIVITY */
/* ---------------------------------- */

function ActivityRow({
  icon,
  title,
  subtitle,
  duration,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle: string;
  duration: string;
}) {
  return (
    <View style={styles.activityRow}>
      <View style={styles.activityIcon}>
        <Ionicons
          name={icon}
          size={16}
          color="#98A2B3"
        />
      </View>

      <View style={styles.activityInfo}>
        <Text style={styles.activityTitle}>
          {title}
        </Text>

        <Text style={styles.activitySubtitle}>
          {subtitle}
        </Text>
      </View>

      <View style={styles.duration}>
        <Ionicons
          name="time-outline"
          size={10}
          color="#667085"
        />

        <Text style={styles.durationText}>
          {duration}
        </Text>
      </View>
    </View>
  );
}

/* ---------------------------------- */
/* LEGEND */
/* ---------------------------------- */

function LegendDot({
  color,
  text,
}: {
  color: string;
  text: string;
}) {
  return (
    <View style={styles.legendItem}>
      <View
        style={[
          styles.legendDot,
          { backgroundColor: color },
        ]}
      />

      <Text style={styles.legendText}>
        {text}
      </Text>
    </View>
  );
}

/* ---------------------------------- */
/* FOOD */
/* ---------------------------------- */

function FoodRow({
  emoji,
  title,
  subtitle,
}: {
  emoji: string;
  title: string;
  subtitle: string;
}) {
  return (
    <View style={styles.foodRow}>
      <View style={styles.foodImage}>
        <Text style={styles.foodEmoji}>
          {emoji}
        </Text>
      </View>

      <View style={styles.foodInfo}>
        <Text style={styles.foodTitle}>
          {title}
        </Text>

        <Text style={styles.foodSubtitle}>
          {subtitle}
        </Text>
      </View>

      <Ionicons
        name="chevron-forward"
        size={13}
        color="#98A2B3"
      />
    </View>
  );
}

/* ---------------------------------- */
/* RESOURCE */
/* ---------------------------------- */

function ResourceRow({
  emoji,
  title,
  subtitle,
}: {
  emoji: string;
  title: string;
  subtitle: string;
}) {
  return (
    <View style={styles.resourceRow}>
      <View style={styles.resourceImage}>
        <Text style={styles.resourceEmoji}>
          {emoji}
        </Text>
      </View>

      <View style={styles.resourceInfo}>
        <Text style={styles.resourceTitle}>
          {title}
        </Text>

        <Text style={styles.resourceSubtitle}>
          {subtitle}
        </Text>
      </View>

      <Ionicons
        name="chevron-forward"
        size={13}
        color="#98A2B3"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020817",
  },

  content: {
    paddingHorizontal: 9,
    paddingBottom: 30,
  },

  /* HEADER */

  header: {
    alignItems: "center",
    paddingTop: 7,
    paddingBottom: 15,
  },

  headerPlus: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    color: "#FFFFFF",
    fontSize: 15,
    lineHeight: 18,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 2,
  },

  /* SECTION */

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 6,
    marginTop: 4,
  },

  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 8,
    fontWeight: "700",
  },

  sectionAction: {
    color: "#2864E8",
    fontSize: 7,
  },

  /* ACTIVITY */

  activityCard: {
    backgroundColor: "#0D1729",
    borderRadius: 10,
    padding: 7,
    marginBottom: 10,
  },

  activityRow: {
    minHeight: 34,
    flexDirection: "row",
    alignItems: "center",
  },

  activityIcon: {
    width: 27,
    height: 27,
    borderRadius: 14,
    backgroundColor: "#172338",
    alignItems: "center",
    justifyContent: "center",
  },

  activityInfo: {
    flex: 1,
    marginLeft: 7,
  },

  activityTitle: {
    color: "#FFFFFF",
    fontSize: 8,
    fontWeight: "600",
  },

  activitySubtitle: {
    color: "#667085",
    fontSize: 6,
    marginTop: 2,
  },

  duration: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },

  durationText: {
    color: "#98A2B3",
    fontSize: 7,
  },

  seeAllButton: {
    alignItems: "center",
    paddingTop: 5,
  },

  seeAllText: {
    color: "#2864E8",
    fontSize: 6,
  },

  /* NUTRITION */

  nutritionCard: {
    backgroundColor: "#0D1729",
    borderRadius: 10,
    padding: 9,
    alignItems: "center",
    marginBottom: 10,
  },

  calorieCircle: {
    width: 95,
    height: 95,
    borderRadius: 48,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  calorieInner: {
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0D1729",
    zIndex: 2,
  },

  calorieValue: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },

  calorieUnit: {
    color: "#98A2B3",
    fontSize: 6,
    marginTop: 2,
  },

  arc: {
    position: "absolute",
    width: 82,
    height: 82,
    borderRadius: 41,
    borderWidth: 5,
  },

  arcBlue: {
    borderColor: "#2864E8",
    borderLeftColor: "transparent",
    borderBottomColor: "transparent",
    transform: [{ rotate: "35deg" }],
  },

  arcGreen: {
    borderColor: "#12B76A",
    borderRightColor: "transparent",
    borderBottomColor: "transparent",
    transform: [{ rotate: "150deg" }],
  },

  arcOrange: {
    borderColor: "#F59E0B",
    borderTopColor: "transparent",
    borderRightColor: "transparent",
    transform: [{ rotate: "225deg" }],
  },

  nutritionLegend: {
    flexDirection: "row",
    gap: 12,
    marginTop: 4,
  },

  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },

  legendDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
  },

  legendText: {
    color: "#98A2B3",
    fontSize: 6,
  },

  balancedTitle: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "600",
    marginTop: 7,
  },

  nutritionDescription: {
    color: "#667085",
    fontSize: 7,
    lineHeight: 10,
    textAlign: "center",
    marginTop: 4,
    marginBottom: 7,
  },

  foodRow: {
    width: "100%",
    height: 36,
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#182337",
  },

  foodImage: {
    width: 27,
    height: 27,
    borderRadius: 6,
    backgroundColor: "#172338",
    alignItems: "center",
    justifyContent: "center",
  },

  foodEmoji: {
    fontSize: 15,
  },

  foodInfo: {
    flex: 1,
    marginLeft: 7,
  },

  foodTitle: {
    color: "#FFFFFF",
    fontSize: 8,
    fontWeight: "600",
  },

  foodSubtitle: {
    color: "#667085",
    fontSize: 6,
    marginTop: 2,
  },

  moreButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
    paddingTop: 7,
  },

  moreButtonText: {
    color: "#2864E8",
    fontSize: 7,
  },

  /* BLOOD PRESSURE */

  bloodCard: {
    backgroundColor: "#0D1729",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },

  normalRange: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "600",
  },

  bloodValue: {
    color: "#98A2B3",
    fontSize: 7,
    marginTop: 2,
  },

  sliderContainer: {
    height: 28,
    justifyContent: "center",
    position: "relative",
    marginTop: 7,
  },

  sliderTrack: {
    position: "absolute",
    left: 10,
    right: 10,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#243247",
  },

  sliderActive: {
    position: "absolute",
    left: 10,
    width: "48%",
    height: 5,
    borderRadius: 3,
    backgroundColor: "#2864E8",
  },

  sliderPoint: {
    position: "absolute",
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#2864E8",
  },

  pointOne: {
    left: "32%",
  },

  pointTwo: {
    left: "48%",
  },

  bloodDescription: {
    color: "#667085",
    fontSize: 7,
    lineHeight: 10,
    marginTop: 5,
  },

  /* SLEEP */

  sleepCard: {
    backgroundColor: "#0D1729",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },

  sleepStatus: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "600",
  },

  sleepSubtitle: {
    color: "#667085",
    fontSize: 7,
    marginTop: 2,
  },

  chart: {
    height: 85,
    marginTop: 8,
    position: "relative",
  },

  chartLine1: {
    position: "absolute",
    width: 90,
    height: 55,
    borderTopWidth: 1,
    borderColor: "#2864E8",
    left: 4,
    top: 18,
    transform: [{ rotate: "-20deg" }],
    borderRadius: 50,
  },

  chartLine2: {
    position: "absolute",
    width: 90,
    height: 55,
    borderTopWidth: 1,
    borderColor: "#2864E8",
    left: 70,
    top: 3,
    transform: [{ rotate: "18deg" }],
    borderRadius: 50,
  },

  chartLine3: {
    position: "absolute",
    width: 100,
    height: 55,
    borderTopWidth: 1,
    borderColor: "#2864E8",
    left: 125,
    top: 25,
    transform: [{ rotate: "-12deg" }],
    borderRadius: 50,
  },

  graphLine: {
    position: "absolute",
    left: 4,
    right: 4,
    bottom: 22,
    height: 1,
    backgroundColor: "#243247",
  },

  days: {
    position: "absolute",
    bottom: 5,
    left: 2,
    right: 2,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  /* React Native Text inside days */
  sleepDescription: {
    color: "#667085",
    fontSize: 7,
    lineHeight: 10,
    marginTop: 2,
  },

  /* RESOURCES */

  resourcesCard: {
    backgroundColor: "#0D1729",
    borderRadius: 10,
    padding: 7,
    marginBottom: 15,
  },

  resourceRow: {
    height: 42,
    flexDirection: "row",
    alignItems: "center",
  },

  resourceImage: {
    width: 37,
    height: 34,
    borderRadius: 6,
    backgroundColor: "#172338",
    alignItems: "center",
    justifyContent: "center",
  },

  resourceEmoji: {
    fontSize: 18,
  },

  resourceInfo: {
    flex: 1,
    marginLeft: 8,
  },

  resourceTitle: {
    color: "#FFFFFF",
    fontSize: 8,
    fontWeight: "600",
  },

  resourceSubtitle: {
    color: "#98A2B3",
    fontSize: 7,
    marginTop: 2,
  },

  resourcesButton: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 3,
    paddingVertical: 7,
  },

  /* CONTINUE */

  continueButton: {
    height: 44,
    borderRadius: 8,
    backgroundColor: "#2864E8",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
  },

  continueText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "600",
  },

  arrow: {
    color: "#FFFFFF",
    fontSize: 17,
  },
});