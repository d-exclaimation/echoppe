//
//  TabScreen.tsx
//  echoppe
//
//  Created by d-exclaimation on 19:25.
//

import React from "react";
import { StyleSheet, View } from "react-native";

type Props = {};

const TabScreen: React.FC<Props> = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ebe1ca",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default TabScreen;
