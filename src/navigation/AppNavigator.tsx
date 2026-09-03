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
<<<<<<< HEAD
=======
import OnboardingScreen from "../screens/onbording/OnboardingReadyScreen";
>>>>>>> c4753424df0081b8b54ea2dffcbdf852360ff987

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
import PhoneNumberScreen from "../screens/auth/PhoneNumberScreen";
import OtpVerificationScreen from "../screens/auth/OtpVerficationScreen";
import ScanIdentificationScreen from "../screens/identity/ScanIdentificationScreen";
import IdentificationCameraScreen from "../screens/identity/IdentificationCameraScreen";
import IdentityVerifiedScreen from "../screens/identity/IdentityVerifiedScreen";
import BiometricSetupScreen from "../screens/identity/BiometricSetupScreen";
import FaceIDSetupScreen from "../screens/identity/FaceIDSetupScreen";
import IdentityVerification from "../screens/identity/IdentityVerificationScreen";
import SecureDataScreen from "../screens/security/SecureDataScreen";
import PrivacyPolicyScreen from "../screens/security/PrivacyPolicyScreen";
import EnableNotificationsScreen from "../screens/security/EnableNotificationsScreen";
import AsklepiosScoreScreen from "../screens/security/AsklepiosScoreScreen";
import AssessmentResultScreen from "../screens/security/AssessmentResultScreen";
import RecommendationsScreen from "../screens/security/RecommendationsScreen";
import PersonalizedRecommendationsScreen from "../screens/security/PersonalizedRecommendationsScreen";
import PickPlanScreen from "../screens/subscription/PickPlanScreen";
import AsklepiosPlusScreen from "../screens/subscription/AsklepiosPlusScreen";
import FreeTrialDetailsScreen from "../screens/subscription/FreeTrialDetailsScreen";
import ProcessingTrialScreen from "../screens/subscription/ProcessingTrialScreen";
import TrialStartedScreen from "../screens/subscription/TrialStartedScreen";




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
        <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} />

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
<<<<<<< HEAD

        {/* Profile Setup */}

        <Stack.Screen
          name="OnboardingSlides"
          component={OnboardingScreen}
        />
=======
        {/* <Stack.Screen
          name={"ProfileSetup" as keyof RootStackParamList}
          component={ProfileSetupScreen}
        /> */}
>>>>>>> c4753424df0081b8b54ea2dffcbdf852360ff987

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
        <Stack.Screen name="PhoneNumberScreen" component={PhoneNumberScreen} />

        <Stack.Screen
          name="OtpVerification"
          component={OtpVerificationScreen}
        />

        <Stack.Screen
  name="ScanIdentification"
  component={ScanIdentificationScreen}
  options={{
    headerShown: false,
  }}
/>

<Stack.Screen
  name="IdentificationCamera"
  component={IdentificationCameraScreen}
  options={{
    headerShown: false,
  }}
/>

<Stack.Screen
  name="IdentityVerified"
  component={IdentityVerifiedScreen}
  options={{
    headerShown: false,
  }}
/>
<Stack.Screen name="IdentityVerification" component={IdentityVerification} options={{ headerShown: false }} />

<Stack.Screen
  name="BiometricSetup"
  component={BiometricSetupScreen}
  options={{
    headerShown: false,
  }}
/>

<Stack.Screen
  name="FaceIDSetup"
  component={FaceIDSetupScreen}
  options={{
    headerShown: false,
  }}
/>
<Stack.Screen
  name="SecureData"
  component={SecureDataScreen}
  options={{ headerShown: false }}
/>

<Stack.Screen
  name="PrivacyPolicy"
  component={PrivacyPolicyScreen}
  options={{ headerShown: false }}
/>

<Stack.Screen
  name="EnableNotifications"
  component={EnableNotificationsScreen}
  options={{ headerShown: false }}
/>

<Stack.Screen
  name="AsklepiosScore"
  component={AsklepiosScoreScreen}
  options={{ headerShown: false }}
/>
<Stack.Screen
  name="AssessmentResult"
  component={AssessmentResultScreen}
  options={{ headerShown: false }}
/>
<Stack.Screen
  name="Recommendations"
  component={RecommendationsScreen}
  options={{ headerShown: false }}
/>
<Stack.Screen
  name="PersonalizedRecommendations"
  component={PersonalizedRecommendationsScreen}
  options={{ headerShown: false }}
/>
<Stack.Screen
  name="PickPlan"
  component={PickPlanScreen}
  options={{ headerShown: false }}
/>

<Stack.Screen
  name="AsklepiosPlus"
  component={AsklepiosPlusScreen}
  options={{ headerShown: false }}
/>

<Stack.Screen
  name="FreeTrialDetails"
  component={FreeTrialDetailsScreen}
  options={{ headerShown: false }}
/>

<Stack.Screen
  name="ProcessingTrial"
  component={ProcessingTrialScreen}
  options={{ headerShown: false }}
/>

<Stack.Screen
  name="TrialStarted"
  component={TrialStartedScreen}
  options={{ headerShown: false }}
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