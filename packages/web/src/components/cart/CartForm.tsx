//
//  CartForm.tsx
//  echoppe
//
//  Created by d-exclaimation on 21:10.
//

import {
  Button,
  Flex,
  IconButton,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Slide,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BiCollapse, BiListPlus, BiSend } from "react-icons/bi";

type Props = {
  handleSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    label: string,
    price: number
  ) => void;
};

const CartForm: React.FC<Props> = ({ handleSubmit }) => {
  const [input, setInput] = useState("");
  const [price, setPrice] = useState(0);
  const [isExpanded, setExpanded] = useState(false);
  const boxColor = useColorModeValue("orange.50", "gray.700");
  const color = useColorModeValue("gray.50", "gray.800");

  return (
    <>
      <IconButton
        aria-label="expand"
        bg={boxColor}
        onClick={() => setExpanded((prev) => !prev)}
        pos="fixed"
        right="2vw"
        bottom="1vw"
        zIndex={2}
        icon={isExpanded ? <BiCollapse /> : <BiListPlus />}
      />
      <form
        style={{
          position: "fixed",
          width: "100vw",
          right: "0",
          bottom: "0",
        }}
        onSubmit={(e) => {
          handleSubmit(e, input, price);
          setInput("");
          setPrice(0);
        }}
      >
        <Slide
          direction="bottom"
          in={isExpanded}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
          }}
        >
          <Flex bg={boxColor} zIndex={1} width="98vw" p="1vw" borderRadius="5">
            <Input
              bg={color}
              mr="1rem"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <NumberInput
              bg={color}
              mr="1rem"
              value={price}
              onChange={(_, num) => setPrice(num)}
              precision={2}
              step={0.01}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <IconButton
              aria-label="send"
              icon={<BiSend />}
              mr="1rem"
              colorScheme="green"
              type="submit"
            />
            <Button opacity="0" />
          </Flex>
        </Slide>
      </form>
    </>
  );
};

export default CartForm;
