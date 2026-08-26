import { useCallback, useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

// Manages the native splash screen: keeps it visible until the app has
// finished its startup prep, then hides it once the first frame lays out.
export function useAppReady() {
  const [appIsReady, setAppIsReady] = useState<boolean>(false);

  useEffect(() => {
    const prepare = async (): Promise<void> => {
      try {
        await new Promise<void>((resolve) => {
          setTimeout(resolve, 300);
        });
      } finally {
        setAppIsReady(true);
      }
    };

    prepare();
  }, []);

  const onLayoutRootView = useCallback((): void => {
    if (appIsReady) {
      SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  return { appIsReady, onLayoutRootView };
}