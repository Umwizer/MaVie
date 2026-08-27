import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import {
  ImageBackground,
  Pressable,
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
    <View className="flex-1 bg-black w-100">
      <StatusBar style="light" />

      <ImageBackground
        source={HERO_IMAGE}
        resizeMode="cover"
        className="flex-1 justify-end"
      >
        <LinearGradient
          colors={[
            "transparent",
            "rgba(0,0,0,0.55)",
            "rgba(0,0,0,0.85)",
          ]}
          locations={[0, 0.55, 1]}
          className="absolute inset-0"
        />

        <View
          className="gap-2 px-6"
          style={{ paddingBottom: insets.bottom + 24 }}
        >
          <Text className="text-4xl font-semibold leading-tight text-white">
            Wellness Starts Here.
          </Text>

          <Text className="mb-5 text-base leading-snug text-white/85">
            Track appointments, meds, meals and habits — all in one place.
          </Text>

          <Pressable
            onPress={onGetStarted}
            className="items-center rounded-full bg-white py-4 active:opacity-85"
          >
            <Text className="text-base font-semibold text-neutral-900">
              Get Started
            </Text>
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
}

export default function SplashScreenView({ onGetStarted }: WelcomeScreenProps) {
  return (
    <WelcomeScreen onGetStarted={onGetStarted} />
  );
}
