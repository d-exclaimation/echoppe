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
  useColorModeValue,
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
  const boxColor = useColorModeValue("orange.100", "gray.700");
  const color = useColorModeValue("gray.50", "gray.800");
  const [isEdited, setEdited] = useState(false);
  return (
    <Box bg={boxColor} overflow="clip" borderRadius={5}>
      <Box ml={2} p={5} bg={color} flexGrow={1}>
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
        <Text mt={4}>{cart.due_date?.toUTCString() ?? cart.description}</Text>
        <EditCartModal
          edited={cart}
          onClose={() => setEdited(false)}
          isOpen={isEdited}
          onSubmit={(item) => onEdit(item, cart.id)}
        />
      </Box>
    </Box>
  );
};

export default Cart;
