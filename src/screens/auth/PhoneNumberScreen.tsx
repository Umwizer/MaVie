import React, { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { Ionicons } from "@expo/vector-icons";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import type { RootStackParamList } from "../../navigation/types";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "PhoneNumberScreen"
>;

export default function PhoneNumberScreen({
  navigation,
}: Props) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendCode = async () => {
    if (!phoneNumber.trim()) {
      return;
    }

    setLoading(true);

    try {
      /*
       Firebase OTP code will go here.

       Example final phone number:
       +250780000000
      */

      const fullPhoneNumber = `+250${phoneNumber}`;

      console.log(
        "Sending OTP to:",
        fullPhoneNumber
      );

      /*
       We will replace this with Firebase verification
       in the next step.
      */

      navigation.navigate("OtpVerification", {
        PhoneNumber: fullPhoneNumber,
        verificationId: "temporary",
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* BACK BUTTON */}

        <Pressable
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name="arrow-back"
            size={22}
            color="#FFFFFF"
          />
        </Pressable>

        {/* ICON */}

        <View style={styles.iconContainer}>
          <Ionicons
            name="phone-portrait-outline"
            size={40}
            color="#2F80ED"
          />
        </View>

        {/* TITLE */}

        <Text style={styles.title}>
          Enter your phone number
        </Text>

        <Text style={styles.description}>
          We'll send a verification code to your
          phone number.
        </Text>

        {/* PHONE INPUT */}

        <Text style={styles.label}>
          Phone number
        </Text>

        <View style={styles.phoneContainer}>
          <View style={styles.countryCode}>
            <Text style={styles.flag}>
              🇷🇼
            </Text>

            <Text style={styles.code}>
              +250
            </Text>
          </View>

          <TextInput
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholder="780 000 000"
            placeholderTextColor="#7A8496"
            keyboardType="phone-pad"
            style={styles.input}
          />
        </View>

        {/* CONTINUE */}

        <Pressable
          style={[
            styles.button,
            loading && styles.buttonDisabled,
          ]}
          onPress={handleSendCode}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <>
              <Text style={styles.buttonText}>
                Send verification code
              </Text>

              <Ionicons
                name="arrow-forward"
                size={18}
                color="#FFFFFF"
              />
            </>
          )}
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#101828",
  },

  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#1D2939",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
  },

  iconContainer: {
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: "rgba(47,128,237,0.15)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 10,
  },

  description: {
    color: "#9AA3B2",
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 40,
  },

  label: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },

  phoneContainer: {
    height: 58,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1D2939",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#344054",
    paddingHorizontal: 14,
  },

  countryCode: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 12,
    borderRightWidth: 1,
    borderRightColor: "#344054",
  },

  flag: {
    fontSize: 20,
    marginRight: 7,
  },

  code: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },

  input: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 16,
    paddingHorizontal: 14,
  },

  button: {
    height: 56,
    marginTop: 28,
    borderRadius: 12,
    backgroundColor: "#2F80ED",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  buttonDisabled: {
    opacity: 0.6,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});