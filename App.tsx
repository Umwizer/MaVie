import "./global.css";
import { useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useAppReady } from "./src/loadingpage/loading";
import { AuthProvider } from "./src/Context/AuthContext";
import { ThemeProvider } from "./src/Context/ThemeContext";
import AppNavigator from "./src/navigation/AppNavigator";
import SplashScreen from "./src/SplashScreen/SplashScreen";

export default function App() {
  const { appIsReady, onLayoutRootView } = useAppReady();
  const [hasStarted, setHasStarted] = useState(false);

  if (!appIsReady) {
    return null;
  }

  return (
    <ThemeProvider>
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
    </ThemeProvider>
  );
}