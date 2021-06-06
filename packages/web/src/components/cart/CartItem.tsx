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
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import { CartItem as CartItemModel } from "@echoppe/common";
import React from "react";
import { AiTwotoneDelete } from "react-icons/ai";

type Props = {
  item: CartItemModel;
  onDelete: (item: CartItemModel) => void;
};

const CartItem: React.FC<Props> = ({ item, onDelete }) => {
  return (
    <Flex p={5} borderWidth="0.1rem" borderRadius={5}>
      <Stat>
        <StatLabel>{item.label}</StatLabel>
        <StatNumber>${item.price.toFixed(2)}</StatNumber>
        <StatHelpText>
          <StatArrow type="increase" />
          0.00%
        </StatHelpText>
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
  );
};

export default CartItem;
