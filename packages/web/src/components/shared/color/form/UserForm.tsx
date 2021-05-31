//
//  UserForm.tsx
//  echoppe
//
//  Created by d-exclaimation on 14:11.
//

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  useColorModeValue,
} from "@chakra-ui/react";
import { useUserForm } from "@echoppe/common";
import React from "react";
import { useShadow } from "../../../../utils/chakra/useShadow";

type Props = {
  onSubmit: (email: string, password: string) => void;
  footer: React.ReactNode;
};

const UserForm: React.FC<Props> = ({ footer, onSubmit }) => {
  const [{ email, pass, isShown }, { updateEmail, updatePass, toggler }] =
    useUserForm();
  const boxColor = useColorModeValue("orange.50", "gray.700");
  const color = useColorModeValue("gray.50", "gray.800");
  const border = useColorModeValue(
    { color: "gray.400", width: "1px" },
    { color: "unset", width: "0px" }
  );
  const shadow = useShadow();
  return (
    <Box
      bg={boxColor}
      borderRadius={[6, 8, 8, 10]}
      p={["1rem", "1rem", "1.5rem", "2rem"]}
      w="75vh"
      maxW="95vw"
      boxShadow={shadow}
    >
      <Flex
        flexDirection="column"
        align="flex-start"
        justify="flex-start"
        p="1rem"
      >
        <Heading size="md" mb="1.5rem">
          Welcome to Echoppe
        </Heading>
        <Heading size="sm" color="gray.500" fontWeight="light" mb="1.5rem">
          Sign in to your account
        </Heading>
      </Flex>
      <Box
        p="1rem"
        bg={color}
        borderRadius={[6, 8, 8, 10]}
        borderColor={border.color}
        borderWidth={border.width}
        mb="1.5rem"
      >
        <FormControl id="email">
          <FormLabel> Email </FormLabel>
          <Input
            value={email}
            onChange={updateEmail}
            variant="flushed"
            placeholder="Enter name"
          />
        </FormControl>

        <FormControl mt={4} id="password">
          <FormLabel> Password </FormLabel>
          <InputGroup>
            <Input
              value={pass}
              onChange={updatePass}
              variant="flushed"
              type={isShown ? "text" : "password"}
              placeholder="Enter password"
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={toggler}>
                {isShown ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
      </Box>
      <Flex justify="flex-end">
        <Button colorScheme="green" onClick={() => onSubmit(email, pass)}>
          Submit
        </Button>
      </Flex>
      <Flex flexDir="column" align="flex-start">
        {footer}
      </Flex>
    </Box>
  );
};

export default UserForm;
