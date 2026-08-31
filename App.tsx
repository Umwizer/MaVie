import { useState, useEffect } from "react";
import { User, onAuthStateChanged } from "firebase/auth"; // <- added User here
import { auth } from "./src/services/firebase";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { View, ActivityIndicator } from "react-native";
import { useAppReady } from "./src/loadingpage/loading";
import { AuthProvider } from "./src/context/AuthContext";
import AppNavigator from "./src/navigation/AppNavigator";
import SplashScreen from "./src/SplashScreen/SplashScreen";

export default function App() {
  const { appIsReady, onLayoutRootView } = useAppReady();
  const [hasStarted, setHasStarted] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null); // <- fixed here

  useEffect(() => {
    console.log("FIREBASE INIT CHECK");
    console.log("API KEY:", process.env.EXPO_PUBLIC_FIREBASE_API_KEY?.slice(0,5));
    
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      console.log("AUTH STATE:", currentUser ? currentUser.email : "NO USER");
      setUser(currentUser); // <- no more error now
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
          {hasStarted ? (
            <AppNavigator />
          ) : (
            <SplashScreen onGetStarted={() => setHasStarted(true)} />
          )}
        </SafeAreaView>
      </SafeAreaProvider>
    </AuthProvider>
  );
}