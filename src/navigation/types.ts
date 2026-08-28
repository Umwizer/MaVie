import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Welcome: undefined;
  OnboardingReady: undefined;
  PersonalInfo: undefined;
  Onboarding: undefined;
  HealthGoals: undefined;
  BirthDate: undefined;
  Gender: undefined;       // <-- Added
  ChoosePlan: undefined;   // <-- Added
};

export type OnboardingStackParamList = {
  Welcome: undefined;
  OnboardingReady: undefined;
  PersonalInfo: undefined;
  Onboarding: undefined;
  HealthGoals: undefined;
  BirthDate: undefined;
  Gender: undefined;
  ChoosePlan: undefined;
};

// Navigation prop types for each screen
export type WelcomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Welcome'
>;

export type OnboardingReadyScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'OnboardingReady'
>;

export type PersonalInfoScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'PersonalInfo'
>;

export type OnboardingScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Onboarding'
>;

export type HealthGoalsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'HealthGoals'
>;

export type BirthDateScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'BirthDate'
>;

export type GenderScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Gender'
>;

export type ChoosePlanScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ChoosePlan'
>;