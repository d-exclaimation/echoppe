//
//  CartForm.tsx
//  echoppe
//
//  Created by d-exclaimation on 21:00.
//

import {CartList} from "@echoppe/common";
import React, {useState} from "react";
import {
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type Props = {
  cart: CartList;
  isShown: boolean;
  setShown: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: (title: string, description: string) => void;
};

const CartForm: React.FC<Props> = ({isShown, setShown, cart, onSubmit}) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  return (
    <Modal
      animationType="slide"
      visible={isShown}
      onRequestClose={() => {
        setShown(prev => !prev);
      }}>
      <SafeAreaView>
        <View style={[style.spaceOut]}>
          <View />
          <TouchableOpacity
            style={style.closeButton}
            onPress={() => setShown(false)}>
            <Text style={style.closeLabel}>✖️</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            marginTop: "20%",
          }}>
          <View style={[style.form]}>
            <Text style={style.formLabel}>Title</Text>
            <TextInput
              style={style.formInput}
              placeholder={cart.title}
              value={title}
              onChangeText={text => setTitle(text)}
            />
          </View>
          <View style={[style.form]}>
            <Text style={style.formLabel}>Description</Text>
            <TextInput
              style={style.formInput}
              placeholder={cart.description}
              value={desc}
              onChangeText={text => setDesc(text)}
            />
          </View>
          <TouchableOpacity
            style={style.submitButton}
            onPress={() => onSubmit(title, desc)}>
            <Text style={style.buttonText}>Update</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
};
const style = StyleSheet.create({
  closeButton: {
    marginRight: 6,
  },
  closeLabel: {
    fontSize: 18,
  },
  spaceOut: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  header: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 20,
  },
  submitButton: {
    padding: 10,
    backgroundColor: "#38A169",
    borderRadius: 10,
  },
  buttonText: {
    color: "#fefefe",
  },
  formLabel: {
    fontWeight: "300",
    fontSize: 11,
    marginBottom: 10,
  },
  formInput: {
    padding: 2,
    borderBottomWidth: 0.5,
    width: "100%",
  },
  form: {
    display: "flex",
    width: "80%",
    alignItems: "flex-start",
    padding: ".5%",
    marginVertical: "2%",
  },
});

export default CartForm;
