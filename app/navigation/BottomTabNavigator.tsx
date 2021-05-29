/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { useColorScheme } from "react-native";
import CartsTabScreen from "../screens/CartsTabScreen";
import UserTabScreen from "../screens/TabTwoScreen";

// Create Navigation Tabs
const BottomTab =
  createBottomTabNavigator<{ Carts: undefined; User: undefined }>();

const BottomTabNavigator: React.FC = () => {
  const colorScheme = useColorScheme();
  return (
    <BottomTab.Navigator
      initialRouteName="Carts"
      tabBarOptions={{
        activeTintColor: colorScheme === "dark" ? "#fafafa" : "#000000",
      }}
    >
      <BottomTab.Screen name="Carts" component={CartsTabNavigator} />
      <BottomTab.Screen name="User" component={UserTabNavigator} />
    </BottomTab.Navigator>
  );
};

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab

// Mark: Screen Tabs

const CartsTabStack = createStackNavigator<{ Carts: undefined }>();

const CartsTabNavigator: React.FC = () => {
  return (
    <CartsTabStack.Navigator>
      <CartsTabStack.Screen
        name="Carts"
        component={CartsTabScreen}
        options={{ headerTitle: "Your Carts" }}
      />
    </CartsTabStack.Navigator>
  );
};

const UserTabStack = createStackNavigator<{ User: undefined }>();

function UserTabNavigator() {
  return (
    <UserTabStack.Navigator>
      <UserTabStack.Screen
        name="User"
        component={UserTabScreen}
        options={{ headerTitle: "User Settings" }}
      />
    </UserTabStack.Navigator>
  );
}

export default BottomTabNavigator;
