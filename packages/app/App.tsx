import {AuthContext, useAuth, useSignOutMutation} from "@echoppe/common";
import React, {useCallback, useState} from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import {QueryClient, QueryClientProvider} from "react-query";
import HomeNavigator from "./components/home/HomeNavigator";
import UserNavigator from "./components/user/UserNavigator";
import {useColor} from "./utils/hooks/color";
import {base} from "./utils/styles";

export type AppDestinations =
  | {pos: "home"}
  | {pos: "user"; subpos: "sign-in" | "sign-up"};

const App = () => {
  const auth = useAuth();
  const signOut = useSignOutMutation({
    onError: () => {},
    onSuccess: () => {},
  });
  const [current, setCurrent] = useState<AppDestinations>({pos: "home"});
  const isDarkMode = useColorScheme() === "dark";
  const {background, backlayer, textColor} = useColor();

  const goHome = useCallback(() => {
    setCurrent({pos: "user", subpos: "sign-in"});
  }, [setCurrent]);

  return (
    <SafeAreaView style={backlayer}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      <View style={styles.sectionContainer}>
        <View style={styles.container}>
          <TouchableOpacity onPress={goHome}>
            <Text style={[styles.sectionTitle, textColor]}>Home</Text>
          </TouchableOpacity>
          <Text style={[styles.sectionTitle, textColor, styles.username]}>
            {auth.user?.username ?? "Not logged in"}
          </Text>
        </View>
        {auth.isLoggedIn && (
          <TouchableOpacity onPress={() => signOut()}>
            <Text style={[styles.sectionTitle]}>👋</Text>
          </TouchableOpacity>
        )}
      </View>
      <AuthContext.Provider value={auth}>
        <View style={[background, base.flex]}>
          {current.pos === "home" ? (
            <HomeNavigator navigate={setCurrent} />
          ) : (
            <UserNavigator initSubPos={current.subpos} navigate={setCurrent} />
          )}
        </View>
      </AuthContext.Provider>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  sectionContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 14,
    marginBottom: 11,
    marginHorizontal: 5,
  },
  container: {
    display: "flex",
    flexDirection: "row",
  },
  username: {
    fontWeight: "200",
  },
});

// Logged in -> HomeViewModel -> [Carts, CartRoom]
// Logged out -> UserViewModel -> [Sign in, or Sign Up]

const queryClient = new QueryClient();

const Index: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);

export default Index;
