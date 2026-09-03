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
  "SecureData"
>;

export default function SecureDataScreen({ navigation }: Props) {
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const canContinue = privacyAccepted && termsAccepted;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Illustration */}
        <View style={styles.illustrationContainer}>
          <View style={styles.glow} />

          <View style={styles.folder}>
            <View style={styles.folderTab} />

            <View style={styles.lockCircle}>
              <Ionicons
                name="lock-closed"
                size={25}
                color="#FFFFFF"
              />
            </View>

            <View style={styles.folderLine1} />
            <View style={styles.folderLine2} />
          </View>

          <View style={styles.person}>
            <View style={styles.personHead} />
            <View style={styles.personBody} />
          </View>
        </View>

        <Text style={styles.title}>
          Your Data is Secure With{"\n"}
          Us, Always Secure.
        </Text>

        <Text style={styles.description}>
          Any information you give us is locked in
          {"\n"}
          tightly with your privacy at the core.
          {"\n"}
          Data protection is our top priority.
        </Text>

        {/* Privacy checkbox */}
        <Pressable
          style={styles.checkboxRow}
          onPress={() => setPrivacyAccepted(!privacyAccepted)}
        >
          <View
            style={[
              styles.checkbox,
              privacyAccepted && styles.checkboxChecked,
            ]}
          >
            {privacyAccepted && (
              <Ionicons
                name="checkmark"
                size={13}
                color="#FFFFFF"
              />
            )}
          </View>

          <Text style={styles.checkboxText}>
            I agree to the Privacy Policy
          </Text>
        </Pressable>

        {/* Terms checkbox */}
        <Pressable
          style={styles.checkboxRow}
          onPress={() => setTermsAccepted(!termsAccepted)}
        >
          <View
            style={[
              styles.checkbox,
              termsAccepted && styles.checkboxChecked,
            ]}
          >
            {termsAccepted && (
              <Ionicons
                name="checkmark"
                size={13}
                color="#FFFFFF"
              />
            )}
          </View>

          <Text style={styles.checkboxText}>
            I agree to the Terms & Conditions
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.continueButton,
            !canContinue && styles.disabledButton,
          ]}
          disabled={!canContinue}
          onPress={() =>
            navigation.navigate("PrivacyPolicy")
          }
        >
          <Text style={styles.continueText}>
            Continue
          </Text>

          <Text style={styles.arrow}>→</Text>
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
    flexGrow: 1,
    alignItems: "center",
    paddingHorizontal: 25,
    paddingTop: 25,
    paddingBottom: 20,
  },

  illustrationContainer: {
    width: 230,
    height: 300,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    marginBottom: 15,
  },

  glow: {
    position: "absolute",
    width: 170,
    height: 120,
    borderRadius: 80,
    backgroundColor: "#0C1933",
  },

  folder: {
    position: "absolute",
    left: 25,
    bottom: 25,
    width: 150,
    height: 90,
    backgroundColor: "#173F9A",
    borderRadius: 15,
    borderTopLeftRadius: 5,
    transform: [{ rotate: "-2deg" }],
  },

  folderTab: {
    position: "absolute",
    top: -10,
    left: 10,
    width: 55,
    height: 18,
    backgroundColor: "#2864E8",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },

  lockCircle: {
    position: "absolute",
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#020817",
    alignItems: "center",
    justifyContent: "center",
    left: 48,
    top: 25,
  },

  folderLine1: {
    position: "absolute",
    left: 20,
    bottom: 17,
    width: 80,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#2864E8",
  },

  folderLine2: {
    position: "absolute",
    left: 20,
    bottom: 9,
    width: 55,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#2864E8",
  },

  person: {
    position: "absolute",
    right: 20,
    top: 20,
    alignItems: "center",
  },

  personHead: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#F4B183",
  },

  personBody: {
    width: 48,
    height: 65,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#E9A7B5",
    marginTop: 3,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 19,
    fontWeight: "700",
    textAlign: "center",
    lineHeight: 25,
    marginBottom: 18,
  },

  description: {
    color: "#98A2B3",
    fontSize: 18,
    lineHeight: 22,
    textAlign: "center",
    marginBottom: 20,
  },

  checkboxRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: "#475467",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 9,
  },

  checkboxChecked: {
    backgroundColor: "#2864E8",
    borderColor: "#2864E8",
  },

  checkboxText: {
    color: "#FFFFFF",
    fontSize: 11,
  },

  continueButton: {
    width: "100%",
    height: 45,
    borderRadius: 9,
    backgroundColor: "#2864E8",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    marginTop: 50,
  },

  disabledButton: {
    opacity: 0.45,
  },

  continueText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
  },

  arrow: {
    color: "#FFFFFF",
    fontSize: 17,
  },
});