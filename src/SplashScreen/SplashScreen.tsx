import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../services/firebase";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/types";

const HERO_IMAGE = require("../../assets/welcome-hero.jpg");

type SplashScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Splash"
>;

export default function SplashScreen() {
  const navigation = useNavigation<SplashScreenNavigationProp>();
  const insets = useSafeAreaInsets();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsub();
  }, []);

  const handleGetStarted = () => {
    // If user is already authenticated, go to OnboardingReady
    // Otherwise, go to Welcome for login/signup
  
      navigation.navigate("OnboardingScreen");};
  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <ImageBackground
        source={HERO_IMAGE}
        resizeMode="cover"
        style={styles.background}
      >
        <LinearGradient
          colors={[
            "transparent",
            "rgba(0,0,0,0.55)",
            "rgba(0,0,0,0.85)",
          ]}
          locations={[0, 0.55, 1]}
          style={StyleSheet.absoluteFill}
        />

        <View
          style={[
            styles.content,
            {
              paddingBottom: insets.bottom + 24,
            },
          ]}
        >
          <Text style={styles.title}>
            Wellness Starts Here.
          </Text>

          <Text style={styles.description}>
            Track appointments, meds, meals and habits — all in one place.
          </Text>

          <Pressable
            onPress={handleGetStarted}
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed,
            ]}
          >
            <Text style={styles.buttonText}>
              Get Started
            </Text>
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },

  background: {
    flex: 1,
    justifyContent: "flex-end",
  },

  content: {
    paddingHorizontal: 24,
    gap: 8,
  },

  title: {
    fontSize: 36,
    lineHeight: 43,
    fontWeight: "600",
    color: "#FFFFFF",
  },

  description: {
    marginBottom: 20,
    fontSize: 16,
    lineHeight: 22,
    color: "rgba(255,255,255,0.85)",
  },

  button: {
    alignItems: "center",
    borderRadius: 999,
    backgroundColor: "#FFFFFF",
    paddingVertical: 16,
  },

  buttonPressed: {
    opacity: 0.85,
  },

  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#171717",
  },
});