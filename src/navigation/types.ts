export type RootStackParamList = {
  Splash: undefined;
  Welcome: undefined;
  OnboardingSlides: undefined;
  OnboardingReady: undefined;

  Gender: undefined;
  WelcomeBoard: undefined;

  BirthDate: undefined;

  PersonalInfo: undefined;

  Login: undefined;
  signUp: undefined;

  ForgotPasswordMethod: undefined;

  ForgotPasswordEmail: {
    method: "email" | "sms" | "2fa";
  };
    PhoneNumber: undefined;

  OtpVerification: {
    PhoneNumber: string;
    verificationId: string;
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
  PhoneNumberScreen: undefined;

  AvatarSelection: undefined;
  ChooseAvatar: undefined;
  OnboardingAvatar: undefined;
  OnboardingScreen: undefined;
  SecurityQuestions: undefined;
    // IDENTIFICATION FLOW
  ScanIdentification: undefined;
  IdentificationCamera: undefined;
  IdentityVerification: undefined;
  IdentityVerified: undefined;
  BiometricSetup: undefined;
  FaceIDSetup: undefined;
SecureData: undefined;
PrivacyPolicy: undefined;
EnableNotifications: undefined;

AsklepiosScore: {
  score?: number;
};

AssessmentResult: {
  score?: number;
};

Recommendations: undefined;
PersonalizedRecommendations: undefined;
PickPlan: undefined;
AsklepiosPlus: undefined;
FreeTrialDetails: undefined;
ProcessingTrial: undefined;
TrialStarted: undefined;
};
