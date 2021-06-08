//
//  CartItemView.tsx
//  echoppe
//
//  Created by d-exclaimation on 23:37.
//

import {CartItem} from "@echoppe/common";
import React from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useColor} from "../../../utils/hooks/color";

type Props = {
  item: CartItem;
  onDelete: (item: CartItem) => void;
};

const CartItemView: React.FC<Props> = ({item, onDelete}) => {
  const {backlayer, dimmed} = useColor();
  return (
    <View style={[style.container, backlayer]}>
      <View style={[style.padded, dimmed]}>
        <View style={[style.spaceOut]}>
          <Text style={[style.heading]}>{item.label}</Text>
          <TouchableOpacity
            style={style.actionButton}
            onPress={() => onDelete(item)}>
            <Text>❌</Text>
          </TouchableOpacity>
        </View>
        <Text style={[]}>${item.price.toFixed(2)}</Text>
      </View>
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
    fontSize: 10,
    marginHorizontal: 3,
  },
  spaceOut: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  container: {
    margin: 10,
    flexGrow: 1,
    overflow: "hidden",
    borderRadius: 4,
  },
  padded: {
    marginLeft: 15,
    minHeight: 55,
    flexGrow: 1,
    padding: 10,
  },
  heading: {
    fontWeight: "500",
    fontSize: 12,
    marginBottom: 6,
  },
});

export default CartItemView;
