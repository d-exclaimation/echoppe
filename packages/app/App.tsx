import {useAuth} from "@echoppe/common";
import React from "react";
import {
  SafeAreaView,
  StatusBar,
  Text,
  useColorScheme,
  View,
} from "react-native";
import {QueryClient, QueryClientProvider} from "react-query";
import Section from "./components/shared/Section";
import {useColor} from "./utils/hooks/color";
import {base} from "./utils/styles";

const App = () => {
  const auth = useAuth();

  const isDarkMode = useColorScheme() === "dark";
  const {background, backlayer} = useColor();

  return (
    <SafeAreaView style={backlayer}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      <Section title={auth.user?.username ?? "Logged out"}></Section>
      <View style={[background, base.flex]}>
        <Text>Welcome to echoppe</Text>
      </View>
    </SafeAreaView>
  );
};

const queryClient = new QueryClient();

const Index: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);

export default Index;
