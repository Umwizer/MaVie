import React from "react";

import { LinearGradient } from "expo-linear-gradient";

import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { StatusBar } from "expo-status-bar";

import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useNavigation } from "@react-navigation/native";

import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import type { RootStackParamList } from "../navigation/types";


const HERO_IMAGE = require("../../assets/welcome-hero.jpg");


type SplashScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Splash"
>;


export default function SplashScreen() {
  const navigation =
    useNavigation<SplashScreenNavigationProp>();

  const insets = useSafeAreaInsets();


  const handleGetStarted = () => {
    navigation.navigate("WelcomeBoard");
  };


  return (
    <View style={styles.container}>

      <StatusBar style="light" />

      <ImageBackground
        source={HERO_IMAGE}
        resizeMode="cover"
        style={styles.background}
      >

        {/* DARK GRADIENT */}

        <LinearGradient
          colors={[
            "rgba(0,0,0,0)",
            "rgba(0,0,0,0.45)",
            "rgba(0,0,0,0.92)",
          ]}
          locations={[0, 0.5, 1]}
          style={styles.gradient}
          pointerEvents="none"
        />


        {/* CONTENT ABOVE GRADIENT */}

        <View
          style={[
            styles.content,
            {
              paddingTop: insets.top + 20,
              paddingBottom: insets.bottom + 24,
            },
          ]}
        >

          <View style={styles.bottomContent}>

            {/* TITLE */}

            <Text style={styles.title}>
              Wellness Starts Here.
            </Text>


            {/* DESCRIPTION */}

            <Text style={styles.description}>
              Track appointments, meds, meals and habits — all in one place.
            </Text>


            {/* GET STARTED BUTTON */}

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

        </View>

      </ImageBackground>

    </View>
  );
}


const styles = StyleSheet.create({

  // =========================
  // MAIN CONTAINER
  // =========================

  container: {
    flex: 1,
    backgroundColor: "#000000",
  },


  // =========================
  // BACKGROUND IMAGE
  // =========================

  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },


  // =========================
  // GRADIENT
  // =========================

  gradient: {
    ...StyleSheet.absoluteFillObject,

    zIndex: 1,
  },


  // =========================
  // MAIN CONTENT
  // =========================

  content: {
    flex: 1,

    justifyContent: "flex-end",

    paddingHorizontal: 24,

    // Content MUST be above gradient
    zIndex: 2,
  },


  bottomContent: {
    width: "100%",
  },


  // =========================
  // TITLE
  // =========================

  title: {
    color: "#FFFFFF",

    fontSize: 36,

    lineHeight: 43,

    fontWeight: "700",

    marginBottom: 10,
  },


  // =========================
  // DESCRIPTION
  // =========================

  description: {
    color: "rgba(255,255,255,0.90)",

    fontSize: 16,

    lineHeight: 23,

    marginBottom: 24,
  },


  // =========================
  // GET STARTED BUTTON
  // =========================

  button: {
    width: "100%",

    height: 58,

    backgroundColor: "#FFFFFF",

    borderRadius: 30,

    alignItems: "center",

    justifyContent: "center",

    // Ensure visibility
    zIndex: 10,

    // Android
    elevation: 10,

    // iOS
    shadowColor: "#000000",

    shadowOffset: {
      width: 0,
      height: 4,
    },

    shadowOpacity: 0.3,

    shadowRadius: 8,
  },


  // =========================
  // PRESSED BUTTON
  // =========================

  buttonPressed: {
    backgroundColor: "#F2F2F2",

    transform: [
      {
        scale: 0.98,
      },
    ],
  },


  // =========================
  // BUTTON TEXT
  // =========================

  buttonText: {
    color: "#171717",

    fontSize: 16,

    fontWeight: "700",
  },

});