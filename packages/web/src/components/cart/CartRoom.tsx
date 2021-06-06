//
//  CartRoom.tsx
//  echoppe
//
//  Created by d-exclaimation on 17:22.
//

import { Box, Flex, Heading, Skeleton, useToast } from "@chakra-ui/react";
import { enqueue, useAuth, useCartChannel } from "@echoppe/common";
import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useQueryParam } from "../../utils/router/useQueryParams";
import CartForm from "./CartForm";
import CartItem from "./CartItem";

const CartRoom: React.FC = () => {
  const { user, isLoading: isAuthLoading } = useAuth();
  const history = useHistory();
  const id = useQueryParam("id");
  const toast = useToast();
  const { insert, remove, items, cart } = useCartChannel(id ?? "", user, {
    joinError: ({ reason }) => {
      toast({
        title: reason,
        description: "Invalid credentials, You don't have access!!",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      enqueue(() => history.push("/"));
    },
    pushError: () =>
      toast({
        title: "Cannot broadcast changes",
        description: "400 Cannot access server, try reloading the page",
        status: "warning",
        duration: 5000,
        isClosable: true,
      }),
  });

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>, label: string, price: number) => {
      e.preventDefault();
      if (!label) return;
      insert({
        label: label,
        price: price,
      });
    },
    [insert]
  );

  if (!isAuthLoading && !user) {
    enqueue(() => history.push("/sign-in"));
    return null;
  }

  return (
    <Flex alignItems="center" flexDir="column" justifyContent="center">
      <Heading fontWeight="light" size="sm">
        Welcome to Cart.List Room{" "}
        <Skeleton isLoaded={!!cart}>
          <Heading size="sm" fontWeight="semibold" color="gray.500">
            {cart?.title}
          </Heading>
        </Skeleton>
      </Heading>
      <Flex flexDir="column" w="80vw" maxW="90vw">
        <Flex flexDir="column" my="1rem">
          {items.map((item) => {
            return (
              <Box key={item.id} my="0.5rem">
                <CartItem item={item} onDelete={remove} />
              </Box>
            );
          })}
        </Flex>
        <CartForm handleSubmit={handleSubmit} />
      </Flex>
    </Flex>
  );
};

export default CartRoom;
