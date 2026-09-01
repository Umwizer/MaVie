import React from "react";
import { StyleSheet, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import { AuthProvider } from "../context/AuthContext";

import SplashScreen from "../SplashScreen/SplashScreen";
import WelcomeScreen from "../screens/onbording/WelcomeScreen";

import LoginScreen from "../screens/auth/LoginScreen";
import SignupScreen from "../screens/auth/SignUpScreen";

import OnboardingReadyScreen from "../screens/onbording/OnboardingReadyScreen";
import GenderScreen from "../screens/onbording/GenderScreen";
import BirthDateScreen from "../screens/onbording/BirthDateScreen";
import PersonalInfoScreen from "../screens/onbording/PersonalInfoScreen";
import HealthGoalsScreen from "../screens/onbording/HealthGoalsScreen";
import OnboardingScreen from "../screens/onbording/OnboardingScreen";

import ProfileSetupScreen from "../screens/profile/ProfileSetupScreen";
import ProfileDetailsScreen from "../screens/profile/ProfileDetailsScreen";
import AvatarSelectionScreen from "../screens/profile/AvatarSelectionScreen";
import ChooseAvatarScreen from "../screens/profile/ChooseAvatarScreen";

import HomeScreen from "../screens/home/HomeScreen";

import type { RootStackParamList } from "./types";

const Stack =
  createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
        />
         <Stack.Screen
          name="OnboardingScreen"
          component={OnboardingScreen}
        />

        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
        />

        <Stack.Screen
          name="Login"
          component={LoginScreen}
        />

        <Stack.Screen
          name="signUp"
          component={SignupScreen}
        />

        <Stack.Screen
          name="OnboardingReady"
          component={OnboardingReadyScreen}
        />

        <Stack.Screen
          name="Gender"
          component={GenderScreen}
        />

        <Stack.Screen
          name="BirthDate"
          component={BirthDateScreen}
        />

        <Stack.Screen
          name="PersonalInfo"
          component={PersonalInfoScreen}
        />

        <Stack.Screen
          name="HealthGoals"
          component={HealthGoalsScreen}
        />
        <Stack.Screen
          name="ProfileSetup"
          component={ProfileSetupScreen}
        />

        <Stack.Screen
          name="ProfileDetails"
          component={ProfileDetailsScreen}
        />

        <Stack.Screen
          name="AvatarSelection"
          component={AvatarSelectionScreen}
        />

        <Stack.Screen
          name="ChooseAvatar"
          component={ChooseAvatarScreen}
        />

        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function AppNavigator() {
  return (
    <AuthProvider>
      <SafeAreaProvider>
        <View style={styles.container}>
          <StatusBar style="light" />
          <RootNavigator />
        </View>
      </SafeAreaProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
});
