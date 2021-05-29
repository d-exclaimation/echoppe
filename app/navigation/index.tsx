import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { useContext } from "react";
import { ColorSchemeName } from "react-native";
import { AuthContext } from "../auth/UserContext";
import NotFoundScreen from "../screens/NotFoundScreen";
import SignInScreen from "../screens/SignInScreen";
import BottomTabNavigator from "./BottomTabNavigator";
import LinkingConfiguration from "./LinkingConfiguration";

type Props = {
  colorScheme: ColorSchemeName;
};
export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const Navigation: React.FC<Props> = ({ colorScheme }) => {
  const context = useContext(AuthContext);
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {context.type === "logged-in" ? (
          <Stack.Screen name="Root" component={BottomTabNavigator} />
        ) : (
          <Stack.Screen name="Root" component={SignInScreen} />
        )}

        <Stack.Screen
          name="NotFound"
          component={NotFoundScreen}
          options={{ title: "Oops!" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
