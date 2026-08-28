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

const HERO_IMAGE = require("../../assets/welcome-hero.jpg");

type WelcomeScreenProps = {
  onGetStarted: () => void;
};

function WelcomeScreen({ onGetStarted }: WelcomeScreenProps) {
  const insets = useSafeAreaInsets();

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
            onPress={onGetStarted}
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

export default function SplashScreenView({
  onGetStarted,
}: WelcomeScreenProps) {
  return <WelcomeScreen onGetStarted={onGetStarted} />;
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