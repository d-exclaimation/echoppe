import { StatusBar } from "expo-status-bar";
import React, { useMemo } from "react";
import "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthContext, UserContext } from "./auth/UserContext";
import { useAuth } from "./hooks/useAuth";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

const App: React.FC = () => {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const { user, authenticate } = useAuth();
  const authValue = useMemo<UserContext>(
    () =>
      user ? { type: "logged-in", user } : { type: "logged-out", authenticate },
    [user]
  );

  if (!isLoadingComplete) return null;

  return (
    <SafeAreaProvider>
      <AuthContext.Provider value={authValue}>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </AuthContext.Provider>
    </SafeAreaProvider>
  );
};

export default App;
