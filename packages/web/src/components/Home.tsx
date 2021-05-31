//
//  Home.tsx
//  echoppe
//
//  Created by d-exclaimation on 12:13.
//

import {
  Box,
  SkeletonText,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  useColorMode,
} from "@chakra-ui/react";
import { AuthContext } from "@echoppe/common";
import React, { useContext } from "react";

const Home: React.FC = () => {
  const { isLoading, user } = useContext(AuthContext);
  const { colorMode } = useColorMode();
  return (
    <Box justifyContent="flex-start">
      <Box
        overflow="hidden"
        width="min(60vh, 90vw)"
        borderRadius="10"
        boxShadow={colorMode === "dark" ? "dark-lg" : "lg"}
        p="2rem"
      >
        <Stat>
          <SkeletonText isLoaded={!isLoading}>
            <StatLabel>{user?.id ?? "null"}</StatLabel>
            <StatNumber>{user?.username ?? "Not logged in"}</StatNumber>
            <StatHelpText>{user?.email ?? "null"}</StatHelpText>
          </SkeletonText>
        </Stat>
      </Box>
    </Box>
  );
};

export default Home;
