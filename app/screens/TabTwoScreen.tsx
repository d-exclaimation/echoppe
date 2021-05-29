import * as React from "react";
import { StyleSheet, Text } from "react-native";
import TabScreen from "../components/shared/TabScreen";

export default function UserTabScreen() {
  return (
    <TabScreen>
      <Text style={styles.title}>Tab Two</Text>
    </TabScreen>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
