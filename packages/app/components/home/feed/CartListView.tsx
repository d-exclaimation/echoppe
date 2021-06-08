//
//  CartItem.tsx
//  echoppe
//
//  Created by d-exclaimation on 19:37.
//

import {CartList} from "@echoppe/common";
import React, {useState} from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useColor} from "../../../utils/hooks/color";
import CartForm from "../shared/CartForm";

type Props = {
  cart: CartList;
  navigateToRoom: (id: string) => void;
  onEdit: (title: string, description: string, id: string) => void;
  onDelete: (id: string) => void;
};

const CartListView: React.FC<Props> = ({
  cart,
  navigateToRoom,
  onEdit,
  onDelete,
}) => {
  const [isShown, setShown] = useState(false);
  const {backlayer, dimmed} = useColor();
  return (
    <View style={[style.container, backlayer]}>
      <View style={[style.padded, dimmed]}>
        <View style={[style.spaceOut]}>
          <TouchableOpacity onPress={() => navigateToRoom(cart.id)}>
            <Text style={[style.heading]}>{cart.title}</Text>
          </TouchableOpacity>
          <View style={[style.actionContainter]}>
            <TouchableOpacity
              style={style.actionButton}
              onPress={() => setShown(true)}>
              <Text>✏️</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={style.actionButton}
              onPress={() => onDelete(cart.id)}>
              <Text>❌</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text>{cart.due_date?.toUTCString() ?? cart.description}</Text>
      </View>
      <CartForm
        cart={cart}
        isShown={isShown}
        setShown={setShown}
        onSubmit={(title, desc) => {
          onEdit(title, desc, cart.id);
          setShown(false);
        }}
      />
    </View>
  );
};

const style = StyleSheet.create({
  closeButton: {
    marginRight: 6,
  },
  closeLabel: {
    fontSize: 18,
  },
  actionContainter: {
    display: "flex",
    flexDirection: "row",
  },
  actionButton: {
    marginHorizontal: 3,
  },
  spaceOut: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  container: {
    margin: 10,
    minHeight: 100,
    flexGrow: 1,
    overflow: "hidden",
    borderRadius: 4,
  },
  padded: {
    marginLeft: 5,
    minHeight: 100,
    flexGrow: 1,
    padding: 10,
  },
  heading: {
    fontWeight: "600",
    fontSize: 14,
    marginBottom: 10,
  },
});

export default CartListView;
