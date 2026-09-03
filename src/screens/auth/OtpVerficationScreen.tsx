import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import {
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
  "OtpVerification"
>;

const OTP_LENGTH = 6;

export default function OtpVerificationScreen({
  navigation,
  route,
}: Props) {
  const { PhoneNumber } = route.params;

  const [otp, setOtp] = useState(
    Array(OTP_LENGTH).fill("")
  );

  const inputRefs = useRef<
    Array<TextInput | null>
  >([]);

  const handleChange = (
    value: string,
    index: number
  ) => {
    const newOtp = [...otp];

    newOtp[index] = value.slice(-1);

    setOtp(newOtp);

    if (
      value &&
      index < OTP_LENGTH - 1
    ) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (
    key: string,
    index: number
  ) => {
    if (
      key === "Backspace" &&
      !otp[index] &&
      index > 0
    ) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const verifyOtp = () => {
    const code = otp.join("");

    if (code.length !== OTP_LENGTH) {
      return;
    }

    console.log(
      "OTP entered:",
      code
    );

    /*
      Firebase verification will be added here.
    */

    navigation.navigate("ScanIdentification");
  };

  const resendCode = () => {
    console.log(
      "Resending OTP to:",
      PhoneNumber
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>

        {/* BACK */}

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
            name="chatbubble-ellipses-outline"
            size={42}
            color="#2F80ED"
          />
        </View>

        {/* TEXT */}

        <Text style={styles.title}>
          Verification code
        </Text>

        <Text style={styles.description}>
          We sent a 6-digit verification code to
        </Text>

        <Text style={styles.phoneNumber}>
          {PhoneNumber}
        </Text>

        {/* OTP INPUTS */}

        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => {
                inputRefs.current[index] = ref;
              }}
              value={digit}
              onChangeText={(value) =>
                handleChange(value, index)
              }
              onKeyPress={({ nativeEvent }) =>
                handleKeyPress(
                  nativeEvent.key,
                  index
                )
              }
              keyboardType="number-pad"
              maxLength={1}
              style={[
                styles.otpInput,
                digit && styles.otpInputFilled,
              ]}
              textAlign="center"
            />
          ))}
        </View>

        {/* VERIFY BUTTON */}

        <Pressable
          style={styles.verifyButton}
          onPress={verifyOtp}
        >
          <Text style={styles.verifyText}>
            Verify phone number
          </Text>

          <Ionicons
            name="checkmark-circle-outline"
            size={19}
            color="#FFFFFF"
          />
        </Pressable>

        {/* RESEND */}

        <View style={styles.resendContainer}>
          <Text style={styles.resendText}>
            Didn't receive the code?
          </Text>

          <Pressable onPress={resendCode}>
            <Text style={styles.resendLink}>
              Resend
            </Text>
          </Pressable>
        </View>

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
    marginBottom: 45,
  },

  iconContainer: {
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: "rgba(47,128,237,0.15)",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 22,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 10,
  },

  description: {
    color: "#9AA3B2",
    fontSize: 14,
    textAlign: "center",
  },

  phoneNumber: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 5,
  },

  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 42,
  },

  otpInput: {
    width: 48,
    height: 58,
    borderRadius: 10,
    backgroundColor: "#1D2939",
    borderWidth: 1,
    borderColor: "#344054",
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "700",
  },

  otpInputFilled: {
    borderColor: "#2F80ED",
  },

  verifyButton: {
    height: 56,
    marginTop: 36,
    borderRadius: 12,
    backgroundColor: "#2F80ED",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  verifyText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  resendContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
    gap: 5,
  },

  resendText: {
    color: "#9AA3B2",
    fontSize: 14,
  },

  resendLink: {
    color: "#2F80ED",
    fontSize: 14,
    fontWeight: "700",
  },
});