// src/navigation/AppNavigator.tsx

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WelcomeScreen from '../screens/onbording/WelcomeScreen';
import OnboardingReadyScreen from '../screens/onbording/OnboardingReadyScreen';
import PersonalInfoScreen from '../screens/onbording/PersonalInfoScreen';
import HealthGoalsScreen from '../screens/onbording/HealthGoalsScreen';
import BirthDateScreen from '../screens/onbording/BirthDateScreen';
import GenderScreen from '../screens/onbording/GenderScreen';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{ headerShown: false, animation: "fade" }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="OnboardingReady" component={OnboardingReadyScreen} />
        <Stack.Screen name="PersonalInfo" component={PersonalInfoScreen} />
        <Stack.Screen name="HealthGoals" component={HealthGoalsScreen} />
        <Stack.Screen name="BirthDate" component={BirthDateScreen} />
        <Stack.Screen name="Gender" component={GenderScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}