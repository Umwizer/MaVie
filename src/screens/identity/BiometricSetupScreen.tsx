import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import * as LocalAuthentication from "expo-local-authentication";

import type { RootStackParamList } from "../../navigation/types";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "BiometricSetup"
>;

export default function BiometricSetupScreen({
  navigation,
}: Props) {
  const [loading, setLoading] = useState(false);

  const handleContinue = async () => {
    if (loading) return;

    try {
      setLoading(true);

      // Check whether the device supports biometric authentication
      const hasHardware =
        await LocalAuthentication.hasHardwareAsync();

      if (!hasHardware) {
        Alert.alert(
          "Biometric authentication unavailable",
          "This device does not support fingerprint or biometric authentication.",
          [
            {
              text: "Continue",
              onPress: () => navigation.navigate("FaceIDSetup"),
            },
          ]
        );

        return;
      }

      // Check whether the user has enrolled a fingerprint/biometric
      const isEnrolled =
        await LocalAuthentication.isEnrolledAsync();

      if (!isEnrolled) {
        Alert.alert(
          "No fingerprint enrolled",
          "Please add a fingerprint or other biometric method in your device settings first.",
          [
            {
              text: "OK",
            },
          ]
        );

        return;
      }

      // Ask the operating system to authenticate the user
      const result =
        await LocalAuthentication.authenticateAsync({
          promptMessage: "Verify your fingerprint",
          cancelLabel: "Cancel",
          disableDeviceFallback: false,
        });

      if (result.success) {
        // Fingerprint/biometric verification succeeded
        navigation.navigate("FaceIDSetup");
      } else {
        Alert.alert(
          "Verification failed",
          "Your fingerprint could not be verified. Please try again."
        );
      }
    } catch (error) {
      console.error(
        "Biometric authentication error:",
        error
      );

      Alert.alert(
        "Biometric error",
        "Something went wrong while verifying your fingerprint."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = () => {
    navigation.navigate("FaceIDSetup");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>

        {/* TITLE */}
        <Text style={styles.title}>
          Biometric Setup
        </Text>

        {/* DESCRIPTION */}
        <Text style={styles.subtitle}>
          Please place your fingerprint on your
          {"\n"}
          sensor for verification.
        </Text>

        {/* FINGERPRINT ICON */}
        <View style={styles.fingerprintContainer}>
          <Ionicons
            name="finger-print-outline"
            size={150}
            color="#FFFFFF"
          />
        </View>

        {/* CONTINUE BUTTON */}
        <Pressable
          style={[
            styles.continueButton,
            loading && styles.disabledButton,
          ]}
          onPress={handleContinue}
          disabled={loading}
        >
          {loading ? (
            <>
              <ActivityIndicator
                size="small"
                color="#FFFFFF"
              />

              <Text style={styles.continueText}>
                Verifying...
              </Text>
            </>
          ) : (
            <>
              <Text style={styles.continueText}>
                Continue
              </Text>

              <Text style={styles.arrow}>
                →
              </Text>
            </>
          )}
        </Pressable>

        {/* SKIP */}
        <Pressable
          style={styles.skipButton}
          onPress={handleSkip}
          disabled={loading}
        >
          <Text style={styles.skipText}>
            Skip for now
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

  title: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 10,
  },

  subtitle: {
    color: "#98A2B3",
    fontSize: 12,
    lineHeight: 18,
    textAlign: "center",
  },

  fingerprintContainer: {
    height: 210,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
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

  disabledButton: {
    opacity: 0.6,
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

  skipButton: {
    marginTop: 15,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },

  skipText: {
    color: "#2864E8",
    fontSize: 12,
    fontWeight: "600",
  },
});