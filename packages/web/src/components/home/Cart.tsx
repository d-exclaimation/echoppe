//
//  Cart.tsx
//  echoppe
//
//  Created by d-exclaimation on 15:41.
//

import { Box, Heading, Link, Text } from "@chakra-ui/react";
import { CartList } from "@echoppe/common";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

type Props = {
  cart: CartList;
};

const Cart: React.FC<Props> = ({ cart }) => {
  return (
    <Box p={5} borderWidth=".1rem" overflow="clip" borderRadius={5}>
      <Link as={RouterLink} to={`/cart?id=${cart.id}`}>
        <Heading fontSize="xl">{cart.title}</Heading>
      </Link>
      <Text mt={4}>{cart.updated_at.toUTCString()}</Text>
    </Box>
  );
};

export default Cart;
