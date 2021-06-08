//
//  CartRoom.tsx
//  echoppe
//
//  Created by d-exclaimation on 20:23.
//

import {useAuth, useCartChannel} from "@echoppe/common";
import React, {useCallback, useState} from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {useColor} from "../../utils/hooks/color";
import CartItemView from "./room/CartItemView";

type Props = {
  id: string;
};

const CartRoom: React.FC<Props> = ({id}) => {
  const {user} = useAuth();
  const {cart, items, remove, insert} = useCartChannel(id, user);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("0.00");
  const isValidPrice = !isNaN(parseFloat(price));
  const {background} = useColor();
  const onSend = useCallback(() => {
    if (!isValidPrice) return;
    insert({
      label: name,
      price: parseFloat(price),
    });
    setName("");
    setPrice("0.00");
  }, [setName, setPrice, insert, name, price, isValidPrice]);

  return (
    <View style={[background, {width: "100%", height: "100%"}]}>
      <View style={[style.headerContainer]}>
        <Text style={style.header}>
          <Text>{cart?.title}</Text>
        </Text>
      </View>
      <FlatList
        data={items}
        renderItem={({item}) => (
          <CartItemView item={item} onDelete={item => remove(item)} />
        )}
        keyExtractor={item => item.id}
      />
      <View style={[style.formModal, background]}>
        <View style={[style.form]}>
          <Text style={style.formLabel}>New Item</Text>
          <View style={[style.formGroup]}>
            <TextInput
              style={[style.formInput, style.textForm]}
              placeholder="Enter name"
              value={name}
              onChangeText={text => setName(text)}
            />
            <TextInput
              keyboardType="decimal-pad"
              placeholder="Enter price"
              clearTextOnFocus
              value={price}
              onChangeText={text => setPrice(text)}
              style={[
                style.formInput,
                style.numPad,
                {
                  borderBottomColor: isValidPrice ? "black" : "red",
                },
              ]}
            />
            <TouchableOpacity style={style.submitButton} onPress={onSend}>
              <Text>🕊</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  headerContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  header: {
    fontWeight: "700",
    fontSize: 20,
    marginVertical: 15,
  },
  formButton: {
    marginRight: 10,
  },
  formModal: {
    width: "100%",
    position: "absolute",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    zIndex: 1,
    bottom: 20,
    height: "15%",
  },
  formLabel: {
    fontWeight: "300",
    fontSize: 11,
    marginBottom: 10,
  },
  formInput: {
    padding: 2,
    borderBottomWidth: 0.5,
  },
  submitButton: {
    marginLeft: 10,
  },
  numPad: {
    marginLeft: 15,
    width: "30%",
  },
  textForm: {
    width: "57%",
  },
  form: {
    display: "flex",
    width: "90%",
    alignItems: "flex-start",
    padding: ".5%",
    marginVertical: "2%",
  },
  formGroup: {
    flexDirection: "row",
    display: "flex",
    width: "100%",
    justifyContent: "space-evenly",
  },
});

export default CartRoom;
