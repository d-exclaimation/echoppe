//
//  Home.tsx
//  echoppe
//
//  Created by d-exclaimation on 12:13.
//

import { Box, GridItem, SimpleGrid } from "@chakra-ui/react";
import { AuthContext, enqueue, useAllCartQuery } from "@echoppe/common";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import Cart from "./Cart";

const Home: React.FC = () => {
  const { isLoading, isLoggedIn, user } = useContext(AuthContext);
  const history = useHistory();
  const { data } = useAllCartQuery();

  if (!isLoading && !isLoggedIn && !user) {
    enqueue(() => history.push("/sign-in"));
    return null;
  }

  return (
    <GridItem
      display="flex"
      flexDir="column"
      justifyContent="center"
      alignItems="center"
    >
      <SimpleGrid
        w="95%"
        columns={{ sm: 1, md: 2, lg: 3 }}
        spacing="3vmin"
        my="3vmin"
      >
        {data.map((cart) => {
          return (
            <Box key={cart.id}>
              <Cart cart={cart} />
            </Box>
          );
        })}
      </SimpleGrid>
    </GridItem>
  );
};

export default Home;
