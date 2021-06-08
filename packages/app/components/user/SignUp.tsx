//
//  SignUp.tsx
//  echoppe
//
//  Created by d-exclaimation on 19:22.
//

import {useSignUpMutation} from "@echoppe/common";
import React, {useState} from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {useColor} from "../../utils/hooks/color";
import {base} from "../../utils/styles";
import UserForm from "./shared/UserForm";
import {UserDestinations} from "./UserNavigator";

type Props = {
  navigate: (destination: UserDestinations) => void;
};

const SignUp: React.FC<Props> = ({navigate}) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const signUp = useSignUpMutation({
    onSuccess: () => {},
    onError: () => Alert.alert("Cannot login!", "Check your credentials"),
  });
  const {background} = useColor();
  return (
    <View style={[base.flex, background, {width: "100%", marginTop: "40%"}]}>
      <UserForm
        onSubmit={(email, password) =>
          signUp({
            user: {
              email,
              password,
              name,
              username,
            },
          })
        }
        header="Sign up to Echoppe"
        customOnTop
        footer={
          <TouchableOpacity onPressIn={() => navigate({pos: "sign-in"})}>
            <Text style={style.footer}>
              Already have an account? Sign In here
            </Text>
          </TouchableOpacity>
        }>
        <View style={[style.form]}>
          <Text style={style.formLabel}>Name</Text>
          <TextInput
            style={style.formInput}
            placeholder="Name"
            value={name}
            onChangeText={text => setName(text)}
          />
        </View>
        <View style={[style.form]}>
          <Text style={style.formLabel}>Username</Text>
          <TextInput
            autoCapitalize={"none"}
            style={style.formInput}
            placeholder="Username"
            value={username}
            onChangeText={text => setUsername(text)}
          />
        </View>
      </UserForm>
    </View>
  );
};

const style = StyleSheet.create({
  footer: {
    marginTop: 20,
    color: "#4299E1",
    fontWeight: "300",
    fontSize: 11,
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

export default SignUp;
