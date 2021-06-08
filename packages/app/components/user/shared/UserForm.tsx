//
//  UserForm.tsx
//  echoppe
//
//  Created by d-exclaimation on 18:51.
//

import React, {useState} from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {useColor} from "../../../utils/hooks/color";
import {base} from "../../../utils/styles";

type Props = {
  header: string;
  onSubmit: (email: string, password: string) => void;
  footer: React.ReactNode;
  customOnTop: boolean;
};

const UserForm: React.FC<Props> = ({
  header,
  onSubmit,
  footer,
  children,
  customOnTop,
}) => {
  const {background} = useColor();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <View style={[style.outerForm, background]}>
      <Text style={style.header}>{header}</Text>
      {customOnTop && children}
      <View style={[style.form]}>
        <Text style={style.formLabel}>Email</Text>
        <TextInput
          autoCapitalize="none"
          style={style.formInput}
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
        />
      </View>
      <View style={[style.form]}>
        <Text style={style.formLabel}>Password</Text>
        <TextInput
          secureTextEntry
          style={style.formInput}
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
        />
      </View>
      {!customOnTop && children}
      <View style={[base.flexToLeft, {width: "80%"}]}>
        <TouchableOpacity
          style={[style.submitButton]}
          onPressIn={() => onSubmit(email, password)}>
          <Text style={style.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
      {footer}
    </View>
  );
};

const style = StyleSheet.create({
  outerForm: {
    ...base.flex,
    padding: "2%",
    width: "100%",
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

export default UserForm;
