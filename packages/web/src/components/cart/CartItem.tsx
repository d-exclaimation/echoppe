//
//  CartItem.tsx
//  echoppe
//
//  Created by d-exclaimation on 19:50.
//

import {
  Flex,
  IconButton,
  Spacer,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from "@chakra-ui/react";
import { CartItem as CartItemModel } from "@echoppe/common";
import React from "react";
import { AiTwotoneDelete } from "react-icons/ai";

type Props = {
  item: CartItemModel;
  onDelete: (item: CartItemModel) => void;
};

const CartItem: React.FC<Props> = ({ item, onDelete }) => {
  const boxColor = useColorModeValue("orange.100", "gray.700");
  const color = useColorModeValue("gray.50", "gray.800");
  return (
    <Flex borderRadius={5} bg={boxColor}>
      <Flex flexGrow={1} bg={color} ml={5} p={5}>
        <Stat>
          <StatLabel>{item.label}</StatLabel>
          <StatNumber>${item.price.toFixed(2)}</StatNumber>
        </Stat>
        <Spacer />
        <IconButton
          colorScheme="red"
          aria-label="delete"
          size="sm"
          onClick={() => onDelete(item)}
          icon={<AiTwotoneDelete />}
        />
      </Flex>
    </Flex>
  );
};

export default CartItem;
