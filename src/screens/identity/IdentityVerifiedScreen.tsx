import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

import type { RootStackParamList } from "../../navigation/types";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "IdentityVerified"
>;

export default function IdentityVerifiedScreen({
  navigation,
}: Props) {
  const handleContinue = () => {
    navigation.navigate("BiometricSetup");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>

        <View style={styles.iconContainer}>
          <Ionicons
            name="checkmark"
            size={34}
            color="#020817"
          />
        </View>

        <Text style={styles.title}>
          Identity successfully verified
        </Text>

        <Text style={styles.description}>
          Thank you for verifying your identity.
          {"\n"}
          Your information is secure and will
          {"\n"}
          only be used to personalize your
          {"\n"}
          health experience.
        </Text>

        <Pressable
          style={styles.continueButton}
          onPress={handleContinue}
        >
          <Text style={styles.continueText}>
            Continue
          </Text>

          <Text style={styles.arrow}>
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
    backgroundColor: "#020817",
  },

  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },

  iconContainer: {
    width: 42,
    height: 42,
    borderRadius: 10,
    backgroundColor: "#00C98D",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 26,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 19,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 12,
  },

  description: {
    color: "#98A2B3",
    fontSize: 12,
    lineHeight: 18,
    textAlign: "center",
    marginBottom: 32,
  },

  continueButton: {
    width: "100%",
    height: 46,
    borderRadius: 10,
    backgroundColor: "#2864E8",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  continueText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
  },

  arrow: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "600",
  },
});