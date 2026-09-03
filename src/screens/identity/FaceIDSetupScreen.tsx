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
import AsyncStorage from "@react-native-async-storage/async-storage";

import type { RootStackParamList } from "../../navigation/types";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "FaceIDSetup"
>;

export default function FaceIDSetupScreen({
  navigation,
}: Props) {
  const [loading, setLoading] = useState(false);

  /**
   * Check what biometric authentication
   * is available on the device.
   */
  const getBiometricType = async () => {
    const types =
      await LocalAuthentication.supportedAuthenticationTypesAsync();

    if (
      types.includes(
        LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION
      )
    ) {
      return "Face ID";
    }

    if (
      types.includes(
        LocalAuthentication.AuthenticationType.FINGERPRINT
      )
    ) {
      return "Fingerprint";
    }

    return "Biometric authentication";
  };

  /**
   * Enable biometric authentication.
   */
  const handleContinue = async () => {
    if (loading) return;

    try {
      setLoading(true);

      // Check if the device supports biometric hardware
      const hasHardware =
        await LocalAuthentication.hasHardwareAsync();

      if (!hasHardware) {
        Alert.alert(
          "Biometric authentication unavailable",
          "This device does not support Face ID or another biometric authentication method.",
          [
            {
              text: "Continue",
              onPress: () => navigation.navigate("SecureData"),
            },
          ]
        );

        return;
      }

      // Check if the user has enrolled a biometric
      const isEnrolled =
        await LocalAuthentication.isEnrolledAsync();

      if (!isEnrolled) {
        Alert.alert(
          "Biometric not set up",
          "Please set up Face ID, fingerprint, or another biometric method in your device settings first."
        );

        return;
      }

      // Determine the available biometric
      const biometricType = await getBiometricType();

      // Ask the operating system to authenticate
      const result =
        await LocalAuthentication.authenticateAsync({
          promptMessage: `Enable ${biometricType}`,
          cancelLabel: "Cancel",
          disableDeviceFallback: false,
        });

      if (!result.success) {
        Alert.alert(
          "Verification failed",
          `Your ${biometricType} could not be verified. Please try again.`
        );

        return;
      }

      /**
       * Authentication succeeded.
       *
       * We do NOT save the face/fingerprint itself.
       * We only save that the user enabled biometric login.
       */
      await AsyncStorage.setItem(
        "biometricEnabled",
        "true"
      );

      await AsyncStorage.setItem(
        "biometricType",
        biometricType
      );

      // Continue to Home
      navigation.navigate("Home");
    } catch (error) {
      console.error(
        "Face/biometric setup error:",
        error
      );

      Alert.alert(
        "Biometric error",
        "Something went wrong while setting up biometric authentication."
      );
    } finally {
      setLoading(false);
    }
  };

  /**
   * User chooses to skip biometric setup.
   */
  const handleSkip = async () => {
    try {
      await AsyncStorage.setItem(
        "biometricEnabled",
        "false"
      );
    } catch (error) {
      console.warn(
        "Could not save biometric preference:",
        error
      );
    }

    navigation.navigate("Home");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>

        {/* TITLE */}
        <Text style={styles.title}>
          Would you like to enable
          {"\n"}
          FaceID® to sign quickly?
        </Text>

        {/* FACE SCANNER */}
        <View style={styles.faceContainer}>
          <View style={styles.faceCorners}>

            {/* TOP LEFT */}
            <View
              style={[
                styles.corner,
                styles.topLeft,
              ]}
            />

            {/* TOP RIGHT */}
            <View
              style={[
                styles.corner,
                styles.topRight,
              ]}
            />

            {/* BOTTOM LEFT */}
            <View
              style={[
                styles.corner,
                styles.bottomLeft,
              ]}
            />

            {/* BOTTOM RIGHT */}
            <View
              style={[
                styles.corner,
                styles.bottomRight,
              ]}
            />

            {/* FACE */}
            <View style={styles.face}>

              {/* EYES */}
              <View style={styles.eyes}>
                <View style={styles.eye} />
                <View style={styles.eye} />
              </View>

              {/* NOSE */}
              <View style={styles.nose} />

              {/* MOUTH */}
              <View style={styles.mouth} />

            </View>
          </View>
        </View>

        {/* DESCRIPTION */}
        <Text style={styles.description}>
          By using FaceID, you agree to the terms and
          {"\n"}
          conditions. We will require biometric
          {"\n"}
          verification when you return to the app
          {"\n"}
          after 3 minutes of inactivity.
        </Text>

        {/* CONTINUE */}
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
    alignSelf: "flex-start",
    color: "#FFFFFF",
    fontSize: 21,
    lineHeight: 25,
    fontWeight: "700",
    marginBottom: 25,
  },

  faceContainer: {
    height: 190,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  faceCorners: {
    width: 125,
    height: 125,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  corner: {
    position: "absolute",
    width: 30,
    height: 30,
    borderColor: "#344054",
  },

  topLeft: {
    top: 0,
    left: 0,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderTopLeftRadius: 10,
  },

  topRight: {
    top: 0,
    right: 0,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderTopRightRadius: 10,
  },

  bottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderBottomLeftRadius: 10,
  },

  bottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderBottomRightRadius: 10,
  },

  face: {
    width: 65,
    height: 75,
    borderWidth: 3,
    borderColor: "#FFFFFF",
    borderRadius: 32,
    alignItems: "center",
    paddingTop: 22,
  },

  eyes: {
    width: 38,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  eye: {
    width: 6,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FFFFFF",
  },

  nose: {
    width: 2,
    height: 10,
    backgroundColor: "#FFFFFF",
    marginTop: 4,
  },

  mouth: {
    width: 20,
    height: 8,
    borderBottomWidth: 2,
    borderColor: "#FFFFFF",
    borderRadius: 10,
    marginTop: 2,
  },

  description: {
    color: "#98A2B3",
    fontSize: 11,
    lineHeight: 17,
    textAlign: "center",
    marginBottom: 25,
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
    marginTop: 14,
    padding: 8,
  },

  skipText: {
    color: "#2864E8",
    fontSize: 12,
    fontWeight: "600",
  },
});