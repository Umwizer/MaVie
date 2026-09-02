import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from '../screens/SplashScreen';
import WelcomeScreen from '../screens/onbording/WelcomeScreen';
import OnboardingReadyScreen from '../screens/onbording/OnboardingReadyScreen';
import PersonalInfoScreen from '../screens/onbording/PersonalInfoScreen';
import HealthGoalsScreen from '../screens/onbording/HealthGoalsScreen';
import BirthDateScreen from '../screens/onbording/BirthDateScreen';
import GenderScreen from '../screens/onbording/GenderScreen';
import WeightScreen from '../screens/onbording/WeightScreen';
import HeightScreen from '../screens/onbording/HeightScreen';
import BloodTypeScreen from '../screens/onbording/BloodTypeScreen';
import FitnessLevelScreen from '../screens/onbording/FitnessLevelScreen';
import SleepLevelScreen from '../screens/onbording/SleepLevelScreen';
import ActivityPreferenceScreen from '../screens/onbording/ActivityPreferenceScreen';
import MoodScreen from '../screens/onbording/MoodScreen';
import DietScreen from '../screens/onbording/DietScreen';
import CaloriesScreen from '../screens/onbording/CaloriesScreen';
import MedicationScreen from '../screens/onbording/MedicationScreen';
import MedicationListScreen from '../screens/onbording/MedicationListScreen';
import MedicationNotFoundScreen from '../screens/onbording/MedicationNotFoundScreen';
import AllergyScreen from '../screens/onbording/AllergyScreen';
import MedicalConditionsScreen from '../screens/onbording/MedicalConditionsScreen';
import MedicalConditionListScreen from '../screens/onbording/MedicalConditionListScreen';
import MedicalConditionSearchScreen from '../screens/onbording/MedicalConditionSearchScreen';
import NextScreen from '../screens/onbording/NextScreen';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash" // <-- THIS MUST BE "Splash"
        screenOptions={{ headerShown: false, animation: "fade" }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="OnboardingReady" component={OnboardingReadyScreen} />
        <Stack.Screen name="PersonalInfo" component={PersonalInfoScreen} />
        <Stack.Screen name="HealthGoals" component={HealthGoalsScreen} />
        <Stack.Screen name="BirthDate" component={BirthDateScreen} />
        <Stack.Screen name="Gender" component={GenderScreen} />
        <Stack.Screen name="Weight" component={WeightScreen} />
        <Stack.Screen name="Height" component={HeightScreen} />
        <Stack.Screen name="BloodType" component={BloodTypeScreen} />
        <Stack.Screen name="FitnessLevel" component={FitnessLevelScreen} />
        <Stack.Screen name="SleepLevel" component={SleepLevelScreen} />
        <Stack.Screen name="ActivityPreference" component={ActivityPreferenceScreen} />
        <Stack.Screen name="Mood" component={MoodScreen} />
        <Stack.Screen name="Diet" component={DietScreen} />
        <Stack.Screen name="Calories" component={CaloriesScreen} />
        <Stack.Screen name="Medication" component={MedicationScreen} />
        <Stack.Screen name="MedicationList" component={MedicationListScreen} />
        <Stack.Screen name="MedicationNotFound" component={MedicationNotFoundScreen} />
        <Stack.Screen name="Allergy" component={AllergyScreen} />
        <Stack.Screen name="MedicalConditions" component={MedicalConditionsScreen} />
        <Stack.Screen name="MedicalConditionList" component={MedicalConditionListScreen} />
        <Stack.Screen name="MedicalConditionSearch" component={MedicalConditionSearchScreen} />
        <Stack.Screen name="NextScreen" component={NextScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}