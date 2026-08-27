// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator, type NativeStackTypeBag } from "@react-navigation/native-stack";
// import type { ComponentType } from "react";
// import { ActivityIndicator, View } from "react-native";

// import { useAuth } from "../context/AuthContext";
// import { useTheme } from "../context/ThemeContext";
// import WelcomeScreen from "../screens/onbording/WelcomeScreen";
// import OnboardingScreen from "../screens/onbording/OnboardingScreen";
// import LoginScreen from "../screens/auth/LoginScreen";
// import SignupScreen from "../screens/auth/SignupScreen";
// import ForgotPasswordMethodScreen from "../screens/auth/ForgotPasswordMethodScreen";
// import ForgotPasswordEmailScreen from "../screens/auth/ForgotPasswordEmailScreen";
// import ResetSentScreen from "../screens/auth/ResetSentScreen";
// import HomeScreen from "../screens/home/HomeScreen";
// import type { RootStackParamList } from "./types";

// const Stack = createNativeStackNavigator
//   RootStackParamList,
//   undefined,
//   NativeStackTypeBag<RootStackParamList, undefined>
// >();

// export default function AppNavigator() {
//   const { user, initializing } = useAuth();
//   const { colors } = useTheme();

//   if (initializing) {
//     return (
//       <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: colors.background }}>
//         <ActivityIndicator color={colors.primary} />
//       </View>
//     );
//   }

//   return (
//     <NavigationContainer>
//       <Stack.Navigator screenOptions={{ headerShown: false, animation: "fade" }}>
//         {user ? (
//           <Stack.Screen name="Home" component={HomeScreen as ComponentType} />
//         ) : (
//           <>
//             <Stack.Screen name="Welcome" component={WelcomeScreen as ComponentType} />
//             <Stack.Screen name="Onboarding" component={OnboardingScreen as ComponentType} />
//             <Stack.Screen name="Login" component={LoginScreen as ComponentType} />
//             <Stack.Screen name="Signup" component={SignupScreen as ComponentType} />
//             <Stack.Screen name="ForgotPasswordMethod" component={ForgotPasswordMethodScreen as ComponentType} />
//             <Stack.Screen name="ForgotPasswordEmail" component={ForgotPasswordEmailScreen as ComponentType} />
//             <Stack.Screen name="ResetSent" component={ResetSentScreen as ComponentType} />
//           </>
//         )}
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }