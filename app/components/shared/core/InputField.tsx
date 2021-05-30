//
//  InputField.tsx
//  echoppe
//
//  Created by d-exclaimation on 16:29.
//

import React from "react";
import { TextInput } from "react-native";
import { BaseStyleProps, styledProps } from "./libs/styledProps";

interface Props extends BaseStyleProps {
  onChangeText?: (text: string) => void;
  placeHolder?: string;
  value?: string;
  secure?: boolean;
}

const InputField: React.FC<Props> = (props) => {
  const {
    placeHolder,
    value,
    onChangeText,
    border,
    p,
    color,
    bg,
    round,
    secure,
  } = props;
  const { baseStyle } = styledProps(props);
  return (
    <TextInput
      secureTextEntry={secure}
      placeholder={placeHolder}
      value={value}
      style={{
        ...baseStyle,
        borderWidth: border || 0,
        padding: p || "1rem",
        color: color || "#252525",
        backgroundColor: bg || "white",
        borderRadius: round || 20,
      }}
      onChangeText={onChangeText}
    />
  );
};

export default InputField;
