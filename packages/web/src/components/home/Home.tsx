//
//  Home.tsx
//  echoppe
//
//  Created by d-exclaimation on 12:13.
//

import {
  Box,
  GridItem,
  IconButton,
  SimpleGrid,
  useToast,
} from "@chakra-ui/react";
import {
  AuthContext,
  enqueue,
  useAllCartQuery,
  useDeleteCartMutation,
  useNewCartMutation,
  usePrequest,
  useUpdateCartMutations,
} from "@echoppe/common";
import React, { useCallback, useContext, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import EditCartModal from "../shared/form/EditCartModal";
import Cart from "./Cart";

const Home: React.FC = () => {
  const [isCreating, setCreating] = useState(false);
  const toast = useToast();
  const errorResponse = useCallback(
    (title: "Creation" | "Update" | "Deletion") => {
      toast({
        title: `${title} failed`,
        description: "Please wait, while we try to resolve this issues",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
    },
    [toast]
  );
  const successResponse = useCallback(
    (title: "Creation" | "Update" | "Deletion") => {
      toast({
        title: `${title} successful`,
        description: "Check your screen, all the stuff should be updated",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    },
    [toast]
  );
  const { isLoading, isLoggedIn, user } = useContext(AuthContext);
  const history = useHistory();

  // API Hooks
  const { data } = useAllCartQuery(); // -> fetch all data
  const { token, isLoadingToken, isErrorToken } = usePrequest(true); // -> fetch token
  const updateCart = useUpdateCartMutations({
    onError: () => errorResponse("Update"),
    onSuccess: () => successResponse("Update"),
  });

  const createCart = useNewCartMutation({
    onError: () => errorResponse("Creation"),
    onSuccess: () => successResponse("Creation"),
  });
  const deleteCart = useDeleteCartMutation({
    onError: () => errorResponse("Deletion"),
    onSuccess: () => successResponse("Deletion"),
  });

  if (!isLoading && !isLoggedIn && !user) {
    enqueue(() => history.push("/sign-in"));
    return null;
  }

  return (
    <GridItem
      display="flex"
      flexDir="column"
      justifyContent="center"
      alignItems="center"
    >
      <SimpleGrid
        w="95%"
        columns={{ sm: 1, md: 2, lg: 3 }}
        spacing="3vmin"
        my="3vmin"
      >
        {data.map((cart) => {
          return (
            <Box key={cart.id}>
              <Cart
                cart={cart}
                onEdit={(item, id) =>
                  updateCart({
                    id,
                    body: item,
                    token: token ?? "",
                  })
                }
                onDelete={(id) =>
                  deleteCart({
                    id,
                    token: token ?? "",
                  })
                }
                canEdit={!isLoadingToken && !isErrorToken}
              />
            </Box>
          );
        })}
      </SimpleGrid>
      <Box>
        <IconButton
          aria-label="add-new"
          size="md"
          fontSize="lg"
          colorScheme="whatsapp"
          p="2"
          position="fixed"
          right="2vw"
          bottom="1vw"
          marginLeft="2"
          icon={<FaPlus />}
          onClick={() => setCreating(true)}
        />
        <EditCartModal
          edited={{
            title: "New Cart",
            description: "",
            updated_at: new Date(),
            due_date: null,
            id: "",
          }}
          isOpen={isCreating}
          onClose={() => setCreating(false)}
          onSubmit={(item) => {
            createCart({
              body: item,
              token: token ?? "",
            });
          }}
        />
      </Box>
    </GridItem>
  );
};

export default Home;
