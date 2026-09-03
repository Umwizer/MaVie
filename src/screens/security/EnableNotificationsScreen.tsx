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
  "EnableNotifications"
>;

export default function EnableNotificationsScreen({
  navigation,
}: Props) {
  const handleEnable = () => {
    // Later we can connect this to expo-notifications.
    navigation.navigate("AsklepiosScore", {
      score: 88,
    });
  };

  const handleSkip = () => {
    navigation.navigate("AsklepiosScore", {
      score: 88,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>
          Enable Notifications
        </Text>

        <Text style={styles.subtitle}>
          Stay informed with timely updates of
          {"\n"}
          your progress and important health
          {"\n"}
          reminders.
        </Text>

        {/* Phone illustration */}
        <View style={styles.phone}>
          <View style={styles.phoneNotch} />

          <View style={styles.notificationCard}>
            <View style={styles.notificationIcon}>
              <Ionicons
                name="add"
                size={18}
                color="#2864E8"
              />
            </View>

            <View style={styles.notificationContent}>
              <Text style={styles.notificationTitle}>
                MaVie
              </Text>

              <Text style={styles.notificationText}>
                Your daily health summary is
                ready.
              </Text>
            </View>

            <Text style={styles.time}>
              Now
            </Text>
          </View>

          <View style={styles.bellCircle}>
            <Ionicons
              name="notifications"
              size={25}
              color="#FFFFFF"
            />
          </View>
        </View>

        <View style={styles.tipRow}>
          <View style={styles.smallDot} />

          <Text style={styles.tipText}>
            You can change this setting at any time.
          </Text>
        </View>

        <Pressable
          style={styles.enableButton}
          onPress={handleEnable}
        >
          <Text style={styles.enableText}>
            Enable All
          </Text>

          <Ionicons
            name="checkmark"
            size={16}
            color="#FFFFFF"
          />
        </Pressable>

        <Pressable
          style={styles.skipButton}
          onPress={handleSkip}
        >
          <Text style={styles.skipText}>
            Skip this step
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
    paddingHorizontal: 25,
    paddingTop: 35,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 19,
    fontWeight: "700",
    textAlign: "center",
  },

  subtitle: {
    color: "#98A2B3",
    fontSize: 10,
    lineHeight: 15,
    textAlign: "center",
    marginTop: 12,
  },

  phone: {
    width: 175,
    height: 230,
    borderWidth: 2,
    borderColor: "#1B2942",
    borderRadius: 24,
    marginTop: 25,
    alignItems: "center",
    position: "relative",
    backgroundColor: "#071124",
    paddingTop: 45,
  },

  phoneNotch: {
    position: "absolute",
    top: 8,
    width: 55,
    height: 7,
    borderRadius: 5,
    backgroundColor: "#020817",
  },

  notificationCard: {
    width: 155,
    minHeight: 65,
    borderRadius: 10,
    backgroundColor: "#18253A",
    flexDirection: "row",
    alignItems: "center",
    padding: 9,
  },

  notificationIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#0D1D3B",
    alignItems: "center",
    justifyContent: "center",
  },

  notificationContent: {
    flex: 1,
    marginLeft: 7,
  },

  notificationTitle: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "700",
  },

  notificationText: {
    color: "#98A2B3",
    fontSize: 7,
    marginTop: 3,
  },

  time: {
    color: "#98A2B3",
    fontSize: 7,
    alignSelf: "flex-start",
  },

  bellCircle: {
    position: "absolute",
    right: 12,
    bottom: 35,
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#12B76A",
    alignItems: "center",
    justifyContent: "center",
  },

  tipRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 18,
  },

  smallDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#344054",
    marginRight: 7,
  },

  tipText: {
    color: "#667085",
    fontSize: 9,
  },

  enableButton: {
    width: "100%",
    height: 44,
    borderRadius: 8,
    backgroundColor: "#2864E8",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    marginTop: 25,
  },

  enableText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },

  skipButton: {
    padding: 12,
  },

  skipText: {
    color: "#2864E8",
    fontSize: 10,
    fontWeight: "600",
  },
});