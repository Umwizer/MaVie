import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import { AuthProvider } from "../context/AuthContext";

// Splash
import SplashScreen from "../SplashScreen/SplashScreen";
import WelcomeBoard from "../screens/onbording/Welcome";

// Onboarding
import WelcomeScreen from "../screens/onbording/WelcomeScreen";
import OnboardingReadyScreen from "../screens/onbording/OnboardingReadyScreen";
import GenderScreen from "../screens/onbording/GenderScreen";
import BirthDateScreen from "../screens/onbording/BirthDateScreen";
import PersonalInfoScreen from "../screens/onbording/PersonalInfoScreen";
import HealthGoalsScreen from "../screens/onbording/HealthGoalsScreen";

// Authentication
import LoginScreen from "../screens/auth/LoginScreen";
import SignupScreen from "../screens/auth/SignUpScreen";

// Profile
import ProfileSetupScreen from "../screens/profile/ProfileSetupScreen";
import ProfileDetailsScreen from "../screens/profile/ProfileDetailsScreen";
import AvatarSelectionScreen from "../screens/profile/AvatarSelectionScreen";
import ChooseAvatarScreen from "../screens/profile/ChooseAvatarScreen";

// Home
import HomeScreen from "../screens/home/HomeScreen";

// Navigation types
import type { RootStackParamList } from "./types";
import OnboardingScreen from "../screens/onbording/OnboardingScreen";
import SecurityQuestion from "../screens/onbording/SecurityQuestion";
import OtpVerificationScreen from "../screens/auth/OtpVerficationScreen";


const Stack = createNativeStackNavigator<RootStackParamList>();


function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
          contentStyle: {
            backgroundColor: "#000000",
          },
        }}
      >
        {/* Splash */}

        <Stack.Screen
          name="Splash"
          component={SplashScreen}
        />

        {/* Welcome */}

        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
        />

        {/* Onboarding Ready */}

        <Stack.Screen
          name="OnboardingReady"
          component={OnboardingReadyScreen}
        />

        {/* Authentication */}

        <Stack.Screen
          name="Login"
          component={LoginScreen}
        />

        <Stack.Screen
          name="signUp"
          component={SignupScreen}
        />
        <Stack.Screen
        name="ProfileSetupScreen"
          component={ProfileSetupScreen}
        />

        {/* Onboarding Steps */}

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

        {/* Profile Setup */}

        <Stack.Screen
          name="OnboardingSlides"
          component={OnboardingScreen}
        />

        <Stack.Screen
          name="ProfileDetails"
          component={ProfileDetailsScreen}
        />
        <Stack.Screen name="WelcomeBoard" component={WelcomeBoard} />

        <Stack.Screen
          name="AvatarSelection"
          component={AvatarSelectionScreen}
        />

        <Stack.Screen
          name="ChooseAvatar"
          component={ChooseAvatarScreen}
        />

        {/* Home */}

        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen
          name="SecurityQuestions"
          component={SecurityQuestion}
        />
        <Stack.Screen
          name="OtpVerification"
          component={OtpVerificationScreen}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default function AppNavigator() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <StatusBar style="light" />

        <RootNavigator />
      </AuthProvider>
    </SafeAreaProvider>
  );
}