import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

import type { RootStackParamList } from "../../navigation/types";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "IdentityVerification"
>;

export default function IdentityVerificationScreen({
  navigation,
}: Props) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("IdentityVerified");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>

        <View style={styles.statusArea}>
          <Text style={styles.statusText}>
            Checking your photo
          </Text>

          <Text style={styles.statusText}>
            Verifying your identity
          </Text>

          <Text style={styles.statusText}>
            Submitting to our database
          </Text>
        </View>

        <View style={styles.loaderContainer}>
          <View style={styles.loaderOuter}>
            <View style={styles.loaderInner}>
              <Ionicons
                name="scan-outline"
                size={34}
                color="#2F80ED"
              />
            </View>
          </View>
        </View>

        <View style={styles.bottomArea}>
          <View style={styles.plusCircle}>
            <Text style={styles.plus}>
              +
            </Text>
          </View>
        </View>

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

  statusArea: {
    alignItems: "center",
    marginBottom: 45,
  },

  statusText: {
    color: "#667085",
    fontSize: 16,
    lineHeight: 32,
    textAlign: "center",
  },

  loaderContainer: {
    alignItems: "center",
    justifyContent: "center",
  },

  loaderOuter: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: "#2F80ED",
    alignItems: "center",
    justifyContent: "center",
  },

  loaderInner: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: "#0B1730",
    alignItems: "center",
    justifyContent: "center",
  },

  bottomArea: {
    position: "absolute",
    bottom: 30,
    alignItems: "center",
  },

  plusCircle: {
    width: 42,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
  },

  plus: {
    color: "#2F80ED",
    fontSize: 42,
    fontWeight: "300",
  },
});