import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  type NativeStackTypeBag,
} from "@react-navigation/native-stack";
import type { ComponentType } from "react";

import WelcomeScreen from "../screens/onbording/WelcomeScreen";
import OnboardingScreen from "../screens/onbording/OnboardingScreen";
import type { RootStackParamList } from "./types";

const Stack = createNativeStackNavigator<
  RootStackParamList,
  undefined,
  NativeStackTypeBag<RootStackParamList, undefined>
>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{ headerShown: false, animation: "fade" }}
      >
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen as ComponentType}
        />
        <Stack.Screen
          name="Onboarding"
          component={OnboardingScreen as ComponentType}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}