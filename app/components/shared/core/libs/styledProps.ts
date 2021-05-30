//
//  styledProps.ts
//  echoppe
//
//  Created by d-exclaimation on 16:35.
//
import { StyleSheet } from "react-native";

export interface BaseStyleProps {
  round?: number;
  bg?: string;
  color?: string;
  w?: string | number;
  maxW?: string | number;
  minW?: string | number;
  h?: string | number;
  maxH?: string | number;
  minH?: string | number;
  p?: string | number;
  px?: string | number;
  py?: string | number;
  border?: number;
  m?: number | string;
  mx?: number | string;
  my?: number | string;
}

export const styledProps = ({
  round,
  bg,
  color,
  w,
  maxH,
  maxW,
  minH,
  minW,
  p,
  px,
  py,
  border,
  m,
  mx,
  my,
}: BaseStyleProps) =>
  StyleSheet.create({
    baseStyle: {
      borderRadius: round,
      backgroundColor: bg,
      color,
      width: w,
      maxHeight: maxH,
      maxWidth: maxW,
      minHeight: minH,
      minWidth: minW,
      padding: p,
      paddingHorizontal: px,
      paddingVertical: py,
      borderWidth: border,
      margin: m,
      marginHorizontal: mx,
      marginVertical: my,
    },
  });
