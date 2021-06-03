//
//  CartRoom.tsx
//  echoppe
//
//  Created by d-exclaimation on 17:22.
//

import {
  Button,
  Flex,
  Heading,
  Input,
  Skeleton,
  Text,
  useToast,
} from "@chakra-ui/react";
import { enqueue, useAuth, useCartChannel } from "@echoppe/common";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useQueryParam } from "../../utils/router/useQueryParams";

const CartRoom: React.FC = () => {
  const { user, isLoading: isAuthLoading } = useAuth();
  const history = useHistory();
  const [input, setInput] = useState("");
  const id = useQueryParam("id");
  const toast = useToast();
  const { insert, items, cart } = useCartChannel(id ?? "", user, {
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
      <Flex flexDir="column" w="60vmax" maxW="90vw">
        <Flex
          flexDir="column"
          p="1rem"
          my="1rem"
          borderWidth=".1rem"
          borderRadius="5"
        >
          {items.map((msg, idx) => {
            const [username, content] = msg.split(": ");
            return (
              <Text key={idx}>
                <Text
                  as="b"
                  color={
                    username === "server"
                      ? "gray.500"
                      : username === user?.username
                      ? "green.500"
                      : "blue.500"
                  }
                  fontWeight="semibold"
                >
                  {username}:{" "}
                </Text>
                {content}
              </Text>
            );
          })}
        </Flex>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!input) return;
            insert({
              msg: input,
              user: user!,
            });
            setInput("");
          }}
        >
          <Flex>
            <Input
              mr="1rem"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <Button colorScheme="green" type="submit">
              Send
            </Button>
          </Flex>
        </form>
      </Flex>
    </Flex>
  );
};

export default CartRoom;
