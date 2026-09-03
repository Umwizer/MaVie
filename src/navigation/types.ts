export type RootStackParamList = {
  Splash: undefined;
  Welcome: undefined;
  Onboarding: undefined;
  OnboardingReady: undefined;
  Chat: undefined;
  Gender: undefined;

  BirthDate:
    | undefined
    | {
        selectedGoal?: string;
      };

  PersonalInfo: undefined;

  Login: undefined;
  signUp: undefined;

  ForgotPasswordMethod: undefined;

  ForgotPasswordEmail: {
    method: "email" | "sms" | "2fa";
  };

  ResetSent: {
    email: string;
  };

  Home: undefined;

  Height: undefined;
  Weight: undefined;
  ActivityLevel: undefined;
  Goal: undefined;

  HealthGoals: undefined;

  ProfileSetup: undefined;
  ProfileDetails: undefined;

  AvatarSelection: undefined;
  ChooseAvatar: undefined;
  OnboardingAvatar: undefined;
  OnboardingScreen: undefined;
};
