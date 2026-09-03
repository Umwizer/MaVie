import React, { useState } from "react";
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
  "FreeTrialDetails"
>;

const faqs = [
  {
    question: "How does it work?",
    answer:
      "Start your free trial and explore Asklepios Plus features.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Your health information is protected using appropriate security measures.",
  },
  {
    question: "How to cancel subscription?",
    answer:
      "You can manage or cancel your subscription through your app store account.",
  },
  {
    question: "How to contact your team?",
    answer:
      "Use the support section in the MaVie app to contact our team.",
  },
];

export default function FreeTrialDetailsScreen({
  navigation,
}: Props) {
  const [openFaq, setOpenFaq] = useState<number | null>(
    null
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* HEADER */}

        <Text style={styles.title}>
          Here's How your free
          {"\n"}
          trial works! 🙌
        </Text>

        {/* STEPS */}

        <View style={styles.stepsCard}>
          <Step
            number="1"
            title="Sign up for your free trial"
            description="Explore all Asklepios Plus features."
          />

          <Step
            number="2"
            title="Explore Premium Features"
            description="Access all premium health insights."
          />

          <Step
            number="3"
            title="Get reminders after trial"
            description="Get notified before your trial ends."
            inactive
          />
        </View>

        {/* TRIAL TEXT */}

        <Text style={styles.trialText}>
          7 days free, then $7.99/week
        </Text>

        <Text style={styles.trialSmallText}>
          That may $31.99/week, billed annually.
        </Text>

        {/* STARS */}

        <View style={styles.stars}>
          <Text style={styles.starText}>
            ★★★★★
          </Text>
        </View>

        <Text style={styles.rating}>
          4.8 on App Store • 80K+ reviews
        </Text>

        {/* FAQ */}

        <View style={styles.faqContainer}>
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;

            return (
              <Pressable
                key={faq.question}
                style={styles.faq}
                onPress={() =>
                  setOpenFaq(
                    isOpen ? null : index
                  )
                }
              >
                <View style={styles.faqHeader}>
                  <View style={styles.questionIcon}>
                    <Text style={styles.questionMark}>
                      ?
                    </Text>
                  </View>

                  <Text style={styles.faqQuestion}>
                    {faq.question}
                  </Text>

                  <Ionicons
                    name={
                      isOpen
                        ? "chevron-up"
                        : "chevron-down"
                    }
                    size={12}
                    color="#98A2B3"
                  />
                </View>

                {isOpen && (
                  <Text style={styles.faqAnswer}>
                    {faq.answer}
                  </Text>
                )}
              </Pressable>
            );
          })}
        </View>

        {/* START */}

        <Pressable
          style={styles.startButton}
          onPress={() =>
            navigation.navigate(
              "ProcessingTrial"
            )
          }
        >
          <Text style={styles.startText}>
            Start Free Trial
          </Text>

          <Text style={styles.arrow}>
            →
          </Text>
        </Pressable>

        <Pressable
          style={styles.seePlans}
          onPress={() =>
            navigation.navigate("PickPlan")
          }
        >
          <Text style={styles.seePlansText}>
            See All Plans
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

/* STEP COMPONENT */

function Step({
  number,
  title,
  description,
  inactive = false,
}: {
  number: string;
  title: string;
  description: string;
  inactive?: boolean;
}) {
  return (
    <View style={styles.stepRow}>
      <View
        style={[
          styles.stepCircle,
          inactive && styles.stepInactive,
        ]}
      >
        <Text style={styles.stepNumber}>
          {number}
        </Text>
      </View>

      <View style={styles.stepInfo}>
        <Text style={styles.stepTitle}>
          {title}
        </Text>

        <Text style={styles.stepDescription}>
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
    paddingHorizontal: 16,
    paddingBottom: 25,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 17,
    lineHeight: 21,
    fontWeight: "700",
    marginTop: 10,
    marginBottom: 15,
  },

  stepsCard: {
    backgroundColor: "#0D1729",
    borderRadius: 12,
    padding: 12,
    marginBottom: 18,
  },

  stepRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 11,
  },

  stepCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#2864E8",
    alignItems: "center",
    justifyContent: "center",
  },

  stepInactive: {
    backgroundColor: "#344054",
  },

  stepNumber: {
    color: "#FFFFFF",
    fontSize: 8,
    fontWeight: "700",
  },

  stepInfo: {
    flex: 1,
    marginLeft: 8,
  },

  stepTitle: {
    color: "#FFFFFF",
    fontSize: 8,
    fontWeight: "600",
  },

  stepDescription: {
    color: "#667085",
    fontSize: 6,
    marginTop: 2,
  },

  trialText: {
    color: "#FFFFFF",
    fontSize: 8,
    fontWeight: "600",
    textAlign: "center",
  },

  trialSmallText: {
    color: "#667085",
    fontSize: 6,
    textAlign: "center",
    marginTop: 3,
  },

  stars: {
    alignItems: "center",
    marginTop: 13,
  },

  starText: {
    color: "#F59E0B",
    fontSize: 15,
    letterSpacing: 2,
  },

  rating: {
    color: "#98A2B3",
    textAlign: "center",
    fontSize: 6,
    marginTop: 3,
    marginBottom: 14,
  },

  faqContainer: {
    gap: 5,
  },

  faq: {
    backgroundColor: "#0D1729",
    borderRadius: 8,
    padding: 9,
  },

  faqHeader: {
    flexDirection: "row",
    alignItems: "center",
  },

  questionIcon: {
    width: 14,
    height: 14,
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
  },

  questionMark: {
    color: "#98A2B3",
    fontSize: 9,
  },

  faqQuestion: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 7,
    marginLeft: 5,
  },

  faqAnswer: {
    color: "#667085",
    fontSize: 6,
    lineHeight: 9,
    marginTop: 7,
    marginLeft: 19,
  },

  startButton: {
    height: 43,
    borderRadius: 8,
    backgroundColor: "#2864E8",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    marginTop: 15,
  },

  startText: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "600",
  },

  arrow: {
    color: "#FFFFFF",
    fontSize: 15,
  },

  seePlans: {
    alignItems: "center",
    paddingVertical: 10,
  },

  seePlansText: {
    color: "#2864E8",
    fontSize: 7,
  },
});