//
//  CartRoom.tsx
//  echoppe
//
//  Created by d-exclaimation on 17:22.
//

import { Code, Flex, Heading } from "@chakra-ui/react";
import React from "react";
import { useQueryParams } from "../../utils/router/useQueryParams";

const CartRoom: React.FC = () => {
  const id = useQueryParams("id");
  return (
    <Flex alignItems="center" flexDir="column" justifyContent="center">
      <Heading fontWeight="light" size="sm">
        Welcome to Cart.List Room <Code size="md">@{"<" + id + ">"}</Code>
      </Heading>
    </Flex>
  );
};

export default CartRoom;
