import * as React from "react";
import { StyleSheet, Text } from "react-native";
import TabScreen from "../components/shared/TabScreen";

export default function CartsTabScreen() {
  return (
    <TabScreen>
      <Text style={styles.title}>Tab One</Text>
    </TabScreen>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
