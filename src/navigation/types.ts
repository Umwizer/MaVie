export type RootStackParamList = {
  Welcome: undefined;
  Onboarding: undefined;
  Login: undefined;
  signUp: undefined;
  ForgotPasswordMethod: undefined;
  ForgotPasswordEmail: { method: "email" | "sms" | "2fa" };
  ResetSent: { email: string };
  Home: undefined;
};

export type StackParamList = {
  Splash: undefined;
  WelcomeStack: undefined;
};