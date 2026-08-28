import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import OnboardingScreen from "../screens/onbording/OnboardingScreen";
import ProfileDetailsScreen from "../screens/profile/ProfileDetailsScreen";
import ProfileSetupScreen from "../screens/profile/ProfileSetupScreen";
import ChooseAvatarScreen from "../screens/profile/ChooseAvatarScreen";
import { SafeAreaView } from "react-native-safe-area-context";

export type RootStackParamList = {
  Onboarding: undefined;
  ProfileSetup: undefined;
  ProfileDetails: undefined;
  ChooseAvatar: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <SafeAreaView style={{ flex: 1 , backgroundColor: "black"}}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Onboarding"
          screenOptions={{ headerShown: false, animation: "fade" }}
        >
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          
          <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} />
          <Stack.Screen name="ProfileDetails" component={ProfileDetailsScreen} />
          <Stack.Screen name="ChooseAvatar" component={ChooseAvatarScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
 