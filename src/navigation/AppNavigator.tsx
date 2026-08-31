import { useState, useEffect } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/firebase";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { View, ActivityIndicator, Text } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAppReady } from "../loadingpage/loading";
import { AuthProvider } from "../context/AuthContext";
import SplashScreen from "../SplashScreen/SplashScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import SignupScreen from "../screens/auth/SignUpScreen";
import type { RootStackParamList } from './types'; // add this import

const Stack = createNativeStackNavigator<RootStackParamList>(); 

export default function App() {
  const { appIsReady, onLayoutRootView } = useAppReady();
  const [hasStarted, setHasStarted] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    console.log("FIREBASE INIT CHECK");
    console.log("API KEY:", process.env.EXPO_PUBLIC_FIREBASE_API_KEY?.slice(0,5));
    
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      console.log("AUTH STATE:", currentUser ? currentUser.email : "NO USER");
      setUser(currentUser);
      setAuthLoading(false);
      
      if (currentUser) {
        setHasStarted(true);
      }
    });
    return () => unsub();
  }, []);

  if (!appIsReady || authLoading) {
    return <View style={{flex:1,justifyContent:'center',alignItems:'center'}}><ActivityIndicator size="large" /></View>;
  }

  return (
    <AuthProvider>
      <SafeAreaProvider onLayout={onLayoutRootView}>
        <SafeAreaView style={{ flex: 1 }}>
          {!hasStarted ? (
            <SplashScreen onGetStarted={() => setHasStarted(true)} />
          ) : (
            <NavigationContainer>
              <Stack.Navigator screenOptions={{ headerShown: false }}>
                {user ? (
                  // For now just show Login even if logged in. Replace later with Home
                  <Stack.Screen name="Login" component={LoginScreen} />
                ) : (
                  <Stack.Screen name="signUp" component={SignupScreen} />
                )}
              </Stack.Navigator>
            </NavigationContainer>
          )}
        </SafeAreaView>
      </SafeAreaProvider>
    </AuthProvider>
  );
}