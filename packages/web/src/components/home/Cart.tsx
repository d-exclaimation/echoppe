//
//  Cart.tsx
//  echoppe
//
//  Created by d-exclaimation on 15:41.
//

import {
  Box,
  Flex,
  Heading,
  IconButton,
  Link,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { CartDTO, CartList } from "@echoppe/common";
import React, { useState } from "react";
import { AiTwotoneDelete, AiTwotoneEdit } from "react-icons/ai";
import { Link as RouterLink } from "react-router-dom";
import EditCartModal from "../shared/form/EditCartModal";

type Props = {
  cart: CartList;
  canEdit: boolean;
  onEdit: (cart: CartDTO, id: string) => void;
  onDelete: (id: string) => void;
};

const Cart: React.FC<Props> = ({ cart, onEdit, canEdit, onDelete }) => {
  const [isEdited, setEdited] = useState(false);
  return (
    <Box p={5} borderWidth=".1rem" overflow="clip" borderRadius={5}>
      <Flex>
        <Link as={RouterLink} to={`/cart?id=${cart.id}`}>
          <Heading fontSize="xl">{cart.title}</Heading>
        </Link>
        <Spacer />
        <IconButton
          colorScheme="facebook"
          aria-label="edit"
          size="sm"
          disabled={!canEdit}
          onClick={() => setEdited(true)}
          icon={<AiTwotoneEdit />}
          mr="2"
        />
        <IconButton
          colorScheme="red"
          aria-label="delete"
          size="sm"
          disabled={!canEdit}
          onClick={() => onDelete(cart.id)}
          icon={<AiTwotoneDelete />}
        />
      </Flex>
      <Text mt={4}>{cart.due_date?.toUTCString() ?? "No due date"}</Text>
      <EditCartModal
        edited={cart}
        onClose={() => setEdited(false)}
        isOpen={isEdited}
        onSubmit={(item) => onEdit(item, cart.id)}
      />
    </Box>
  );
};

export default Cart;
