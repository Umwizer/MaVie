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
  "TrialStarted"
>;

export default function TrialStartedScreen({
  navigation,
}: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* PLUS LOGO */}

        <View style={styles.logoArea}>
          <View style={styles.plusBadge}>
            <Ionicons
              name="add"
              size={38}
              color="#FFFFFF"
            />
          </View>

          <View style={styles.floatingStar}>
            <Ionicons
              name="sparkles"
              size={16}
              color="#FFFFFF"
            />
          </View>

          <View style={styles.floatingCarrot}>
            <Text style={styles.emoji}>
              🥕
            </Text>
          </View>

          <View style={styles.floatingLeaf}>
            <Text style={styles.emoji}>
              🌿
            </Text>
          </View>

          <View style={styles.plusPill}>
            <Text style={styles.plusText}>
              plus
            </Text>
          </View>
        </View>

        {/* SUCCESS */}

        <Text style={styles.title}>
          Your asklepios plus free
          {"\n"}
          trial has begun!
        </Text>

        <Text style={styles.description}>
          You can cancel or change your plan at any
          {"\n"}
          time. We'll send you a reminder first.
        </Text>

        {/* BUTTON */}

        <Pressable
          style={styles.button}
          onPress={() =>
            navigation.replace("Home")
          }
        >
          <Text style={styles.buttonText}>
            Let's get started!
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020817",
  },

  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 25,
  },

  logoArea: {
    width: 240,
    height: 190,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    marginBottom: 20,
  },

  plusBadge: {
    width: 115,
    height: 65,
    borderRadius: 30,
    backgroundColor: "#2864E8",
    alignItems: "center",
    justifyContent: "center",
    transform: [
      {
        rotate: "-3deg",
      },
    ],
    zIndex: 3,
  },

  plusText: {
    color: "#FFFFFF",
    fontSize: 27,
    fontWeight: "700",
  },

  plusPill: {
    position: "absolute",
    width: 85,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#2864E8",
    alignItems: "center",
    justifyContent: "center",
    top: 74,
    zIndex: 4,
  },

  floatingStar: {
    position: "absolute",
    left: 48,
    top: 50,
    width: 35,
    height: 35,
    borderRadius: 18,
    backgroundColor: "#344054",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 4,
  },

  floatingCarrot: {
    position: "absolute",
    right: 37,
    top: 72,
    zIndex: 4,
  },

  floatingLeaf: {
    position: "absolute",
    right: 35,
    bottom: 38,
    zIndex: 4,
  },

  emoji: {
    fontSize: 28,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 17,
    lineHeight: 22,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 10,
  },

  description: {
    color: "#98A2B3",
    fontSize: 8,
    lineHeight: 12,
    textAlign: "center",
    marginBottom: 22,
  },

  button: {
    width: "100%",
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