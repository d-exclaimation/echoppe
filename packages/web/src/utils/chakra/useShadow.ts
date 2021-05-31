//
//  useShadow.ts
//  echoppe
//
//  Created by d-exclaimation on 12:46.
//

import { useColorModeValue } from "@chakra-ui/react";

export const useShadow = () => {
  const shadow = useColorModeValue("lg", "dark-lg");
  return shadow;
};
