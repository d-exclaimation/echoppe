//
//  CartsView.tsx
//  echoppe
//
//  Created by d-exclaimation on 19:32.
//

import {
  CartList,
  useAllCartQuery,
  useDeleteCartMutation,
  useNewCartMutation,
  usePrequest,
  useUpdateCartMutations,
} from "@echoppe/common";
import React, {useCallback, useMemo, useState} from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {useColor} from "../../utils/hooks/color";
import CartListView from "./feed/CartListView";
import {HomeDestinations} from "./HomeNavigator";
import CartForm from "./shared/CartForm";

type Props = {
  navigate: (destination: HomeDestinations) => void;
};

const CartsView: React.FC<Props> = ({navigate}) => {
  // State hooks
  const navigateToRoom = useCallback(
    (id: string) => {
      navigate({pos: "cartroom", payload: id});
    },
    [navigate],
  );
  const {background} = useColor();
  const response = useMemo(
    () => ({
      onError: () => Alert.alert("Cannot Update", "Try again later"),
      onSuccess: () => {},
    }),
    [Alert],
  );
  const [isCreating, setCreating] = useState(false);

  // API Hookes
  const {data} = useAllCartQuery(); // -> Fetch all
  const {token} = usePrequest(false); // -> Fetch token
  const createCart = useNewCartMutation(response); // -> mutate create
  const deleteCart = useDeleteCartMutation(response); // -> mutate delete
  const updateCart = useUpdateCartMutations(response); // -> mutate update
  return (
    <View style={[background, {width: "100%", height: "100%"}]}>
      <View style={[style.spaceOut]}>
        <View />
        <TouchableOpacity onPress={() => setCreating(prev => !prev)}>
          <Text>📝</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        contentContainerStyle={{display: "flex", flexGrow: 1}}
        data={data}
        renderItem={cart => (
          <CartListView
            cart={cart.item}
            navigateToRoom={navigateToRoom}
            onEdit={(title, description, id) =>
              updateCart({
                id,
                body: {
                  title,
                  description,
                },
                token: token ?? "",
              })
            }
            onDelete={id =>
              deleteCart({
                id,
                token: token ?? "",
              })
            }
          />
        )}
        keyExtractor={item => item.id}
      />
      <CartForm
        cart={dummy}
        isShown={isCreating}
        setShown={setCreating}
        onSubmit={(title, description) => {
          createCart({
            body: {
              title,
              description,
              due_date: null,
            },
            token: token ?? "",
          });
        }}
      />
    </View>
  );
};

const style = StyleSheet.create({
  spaceOut: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
  },
});

const dummy: CartList = {
  title: "New Card",
  id: "",
  description: "none",
  updated_at: new Date(),
  due_date: null,
};

export default CartsView;
