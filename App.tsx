import { LinearGradient } from "expo-linear-gradient";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useState } from "react";
import {
  ImageBackground,
  Pressable,
  Text,
  View,
} from "react-native";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import "./global.css";

SplashScreen.preventAutoHideAsync();

const HERO_IMAGE = require("./assets/welcome-hero.jpg");

type WelcomeScreenProps = {
  onGetStarted: () => void;
};

function WelcomeScreen({ onGetStarted }: WelcomeScreenProps) {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-black">
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

export default function App() {
  const [appIsReady, setAppIsReady] = useState<boolean>(false);

  useEffect(() => {
    const prepare = async (): Promise<void> => {
      try {
        await new Promise<void>((resolve) => {
          setTimeout(resolve, 300);
        });
      } finally {
        setAppIsReady(true);
      }
    };

    prepare();
  }, []);

  const onLayoutRootView = useCallback((): void => {
    if (appIsReady) {
      SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <SafeAreaProvider onLayout={onLayoutRootView}>
      <WelcomeScreen
        onGetStarted={() => {
          console.log("Get Started pressed");
        }}
      />
    </SafeAreaProvider>
  );
}