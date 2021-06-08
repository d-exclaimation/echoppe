//
//  color.ts
//  echoppe
//
//  Created by d-exclaimation on 21:47.
//
import {StyleSheet, useColorScheme} from "react-native";

export function useColor() {
  const isDarkMode = useColorScheme() === "dark";
  return StyleSheet.create({
    background: {
      backgroundColor: isDarkMode ? "#1A202C" : "#ffffff",
    },
    dimmed: {
      backgroundColor: isDarkMode ? "#2D3748" : "#fafafa",
    },
    backlayer: {
      backgroundColor: isDarkMode ? "#2D3748" : "#FEEBC8",
    },
    textColor: {
      color: isDarkMode ? "#EDF2F7" : "#171923",
    },
  });
}
