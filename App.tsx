import { useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useAppReady } from "./src/loadingpage/loading";
import AppNavigator from "./src/navigation/AppNavigator";
import SplashScreen from "./src/SplashScreen/SplashScreen";
import { auth } from "./src/services/firebase"
export default function App() {
  const { appIsReady, onLayoutRootView } = useAppReady();
  const [hasStarted, setHasStarted] = useState(false);

  if (!appIsReady) {
    return null;
  }
  return (
    <SafeAreaProvider onLayout={onLayoutRootView}>
      <SafeAreaView style={{ flex: 1 }}>
        {hasStarted ? (
          <AppNavigator />
        ) : (
          <SplashScreen onGetStarted={() => setHasStarted(true)} />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}