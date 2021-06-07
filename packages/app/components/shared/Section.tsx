//
//  Section.tsx
//  echoppe
//
//  Created by d-exclaimation on 22:07.
//

import React from "react";
import {StyleSheet, Text, View} from "react-native";
import {useColor} from "../../utils/hooks/color";

type Props = {
  title: string;
};

const Section: React.FC<Props> = ({children, title}) => {
  const {textColor} = useColor();
  return (
    <View style={styles.sectionContainer}>
      <Text style={[styles.sectionTitle, textColor]}>{title}</Text>
      <Text style={[styles.sectionDescription, textColor]}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 18,
  },
  sectionTitle: {
    fontSize: 18,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
  },
});

export default Section;
