//
//  SignIn.tsx
//  echoppe
//
//  Created by d-exclaimation on 12:28.
//

import { Flex, Link, Text, useToast } from "@chakra-ui/react";
import { AuthContext, useLogin } from "@echoppe/common";
import React, { useContext } from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import UserForm from "../shared/color/form/UserForm";

const SignIn: React.FC = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const toast = useToast();
  const history = useHistory();
  const login = useLogin({
    onError: () =>
      toast({
        title: "Cannot login!!",
        description: "Invalid credentials, check your email and password!!",
        status: "error",
        duration: 5000,
        isClosable: true,
      }),
    onSuccess: () => {
      toast({
        title: "Welcome back!",
        description: "You have successfully login",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      history.push("/");
    },
  });

  if (isLoggedIn) {
    history.push("/");
    return null;
  }

  return (
    <Flex h="50vh" align="center" justify="center">
      <UserForm
        onSubmit={(email, password) => {
          login({
            login: {
              email,
              password,
            },
          });
        }}
        footer={
          <>
            <Text fontSize="sm" color="gray.500" fontWeight="light">
              Don't have an account, yet?
            </Text>
            <Link
              as={RouterLink}
              to="/sign-up"
              fontSize="sm"
              color="teal.500"
              fontWeight="light"
            >
              Too bad lol :p
            </Link>
          </>
        }
      />
    </Flex>
  );
};

export default SignIn;
