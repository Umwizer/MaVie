import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Welcome: undefined;
  OnboardingReady: undefined;
  PersonalInfo: undefined;
  Onboarding: undefined;
  HealthGoals: undefined;
  BirthDate: undefined;
  Gender: undefined;
  Weight: undefined;
  Height: undefined;
  BloodType: undefined;
  FitnessLevel: undefined;
  SleepLevel: undefined;
  ActivityPreference: undefined;
  Mood: undefined;
  Diet: undefined;
  Calories: undefined;
  Medication: undefined;
  MedicationList: undefined;
  MedicationNotFound: { searchedMedication: string };
  Allergy: undefined;
  MedicalConditions: undefined;
  MedicalConditionList: undefined;
  MedicalConditionSearch: undefined; // <-- ADD THIS
  NextScreen: undefined;
};