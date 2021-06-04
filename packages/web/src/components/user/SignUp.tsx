//
//  SignUp.tsx
//  echoppe
//
//  Created by d-exclaimation on 18:56.
//

import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Link,
  Text,
  useToast,
} from "@chakra-ui/react";
import { AuthContext, enqueue, useSignUpMutation } from "@echoppe/common";
import React, { useContext, useState } from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import UserForm from "../shared/form/UserForm";

const SignUp: React.FC = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const toast = useToast();
  const history = useHistory();
  const signUp = useSignUpMutation({
    onError: () =>
      toast({
        title: "Cannot Sign Up!!",
        description: "Invalid fields!!",
        status: "error",
        duration: 5000,
        isClosable: true,
      }),
    onSuccess: () => {
      toast({
        title: "Welcome back!",
        description: "You have successfully signed up and logged in",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      enqueue(() => history.push("/"));
    },
  });
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");

  if (isLoggedIn) {
    enqueue(() => history.push("/"));
    return null;
  }

  return (
    <Flex h="90vh" alignItems="center" justifyContent="center">
      <UserForm
        subheading="Sign Up for an account"
        customOnTop
        onSubmit={(email, password) => {
          signUp({
            user: {
              email,
              password,
              name,
              username,
            },
          });
        }}
        footer={
          <>
            <Text fontSize="sm" color="gray.500" fontWeight="light">
              Already have an account
            </Text>
            <Link
              as={RouterLink}
              to="/sign-in"
              fontSize="sm"
              color="teal.500"
              fontWeight="light"
            >
              Sign in here
            </Link>
          </>
        }
      >
        <FormControl id="name" mb="4">
          <FormLabel> Name </FormLabel>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            variant="flushed"
            placeholder="Enter name"
          />
        </FormControl>
        <FormControl id="username" mb="4">
          <FormLabel> Username </FormLabel>
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            variant="flushed"
            placeholder="Enter username"
          />
        </FormControl>
      </UserForm>
    </Flex>
  );
};

export default SignUp;
