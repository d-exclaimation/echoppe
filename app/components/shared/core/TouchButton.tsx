//
//  Button.tsx
//  echoppe
//
//  Created by d-exclaimation on 16:16.
//

import React from "react";
import { GestureResponderEvent, Text, TouchableOpacity } from "react-native";
import { BaseStyleProps, styledProps } from "./libs/styledProps";

interface Props extends BaseStyleProps {
  onPress?: (event: GestureResponderEvent) => void;
  align?: "auto" | "left" | "right" | "center" | "justify";
}

const TouchButton: React.FC<Props> = (props) => {
  const { p, round, color, bg, w, onPress, align, children } = props;
  const { baseStyle } = styledProps(props);
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.5}
      style={{
        ...baseStyle,
        padding: p || "0.75rem",
        borderRadius: round || 10,
        justifyContent: "center",
        backgroundColor: bg || "#908900",
        width: w || "8rem",
      }}
    >
      <Text style={{ textAlign: align || "center", color: color || "white" }}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export default TouchButton;
