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
  "PickPlan"
>;

export default function PickPlanScreen({
  navigation,
}: Props) {
  const [monthly, setMonthly] = useState(true);

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

        {/* TITLE */}

        <Text style={styles.title}>
          Pick Your Right Plan
        </Text>

        {/* MONTHLY / YEARLY */}

        <View style={styles.billingContainer}>
          <Text
            style={[
              styles.billingText,
              monthly && styles.activeBilling,
            ]}
          >
            Monthly
          </Text>

          <Pressable
            style={[
              styles.toggle,
              !monthly && styles.toggleYearly,
            ]}
            onPress={() => setMonthly(!monthly)}
          >
            <View style={styles.toggleCircle} />
          </Pressable>

          <Text
            style={[
              styles.billingText,
              !monthly && styles.activeBilling,
            ]}
          >
            Yearly
          </Text>
        </View>

        {/* FREE PLAN */}

        <View style={styles.planCard}>
          <Text style={styles.planLabel}>
            FREE PLAN
          </Text>

          <Text style={styles.price}>
            $0 USD
          </Text>

          <Text style={styles.priceDescription}>
            Basic health tools & insights
          </Text>

          <Pressable>
            <Text style={styles.learnMore}>
              Learn More
            </Text>
          </Pressable>
        </View>

        {/* PLUS PLAN */}

        <Pressable
          style={[
            styles.planCard,
            styles.plusCard,
          ]}
          onPress={() =>
            navigation.navigate("AsklepiosPlus")
          }
        >
          <View style={styles.selectedCheck}>
            <Ionicons
              name="checkmark"
              size={12}
              color="#FFFFFF"
            />
          </View>

          <Text style={styles.planLabel}>
            PLUS PLAN
          </Text>

          <Text style={styles.price}>
            {monthly ? "$7.99 USD" : "$79.99 USD"}
          </Text>

          <Text style={styles.priceDescription}>
            Advanced features & insights
          </Text>

          <Text style={styles.learnMore}>
            Learn More
          </Text>
        </Pressable>

        {/* CONTINUE */}

        <Pressable
          style={styles.continueButton}
          onPress={() =>
            navigation.navigate("AsklepiosPlus")
          }
        >
          <Text style={styles.continueText}>
            Continue
          </Text>

          <Text style={styles.arrow}>
            →
          </Text>
        </Pressable>

        <Text style={styles.cancelText}>
          Cancel anytime
        </Text>

        {/* FOOTER */}

        <View style={styles.footer}>
          <Pressable>
            <Text style={styles.footerLink}>
              Privacy Policy
            </Text>
          </Pressable>

          <Text style={styles.footerDivider}>
            •
          </Text>

          <Pressable>
            <Text style={styles.footerLink}>
              Terms & Conditions
            </Text>
          </Pressable>
        </View>
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
    paddingBottom: 25,
  },

  backButton: {
    width: 35,
    height: 35,
    justifyContent: "center",
  },

  title: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 4,
    marginBottom: 12,
  },

  billingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    marginBottom: 18,
  },

  billingText: {
    color: "#667085",
    fontSize: 8,
  },

  activeBilling: {
    color: "#FFFFFF",
  },

  toggle: {
    width: 34,
    height: 17,
    borderRadius: 10,
    backgroundColor: "#344054",
    justifyContent: "center",
    paddingHorizontal: 2,
  },

  toggleYearly: {
    backgroundColor: "#2864E8",
  },

  toggleCircle: {
    width: 13,
    height: 13,
    borderRadius: 7,
    backgroundColor: "#667085",
  },

  planCard: {
    backgroundColor: "#0D1729",
    borderRadius: 12,
    padding: 13,
    marginBottom: 9,
    position: "relative",
  },

  plusCard: {
    backgroundColor: "#102A63",
    borderWidth: 1,
    borderColor: "#2864E8",
  },

  selectedCheck: {
    position: "absolute",
    right: 10,
    top: 10,
    width: 17,
    height: 17,
    borderRadius: 9,
    backgroundColor: "#2864E8",
    alignItems: "center",
    justifyContent: "center",
  },

  planLabel: {
    color: "#98A2B3",
    fontSize: 7,
    fontWeight: "700",
  },

  price: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
    marginTop: 5,
  },

  priceDescription: {
    color: "#667085",
    fontSize: 7,
    marginTop: 3,
  },

  learnMore: {
    color: "#2864E8",
    fontSize: 7,
    marginTop: 7,
  },

  continueButton: {
    height: 44,
    backgroundColor: "#2864E8",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    marginTop: 5,
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

  cancelText: {
    color: "#667085",
    textAlign: "center",
    fontSize: 7,
    marginTop: 8,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 7,
    marginTop: 15,
  },

  footerLink: {
    color: "#2864E8",
    fontSize: 6,
  },

  footerDivider: {
    color: "#667085",
    fontSize: 6,
  },
});