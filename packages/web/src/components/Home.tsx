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
import { AuthContext, useAllCartQuery } from "@echoppe/common";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

const Home: React.FC = () => {
  const { isLoading, isLoggedIn, user } = useContext(AuthContext);
  const history = useHistory();
  const { isLoading: cartIsLoading, data } = useAllCartQuery();
  const { colorMode } = useColorMode();

  if (!isLoading && !isLoggedIn) {
    history.push("/sign-in");
    return null;
  }

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

      <SkeletonText isLoaded={!cartIsLoading && !isLoading}>
        {data.map((cart) => {
          return <Box key={cart.id}>{cart.title}</Box>;
        })}
      </SkeletonText>
    </Box>
  );
};

export default Home;
