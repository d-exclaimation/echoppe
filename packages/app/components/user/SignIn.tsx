//
//  SignIn.tsx
//  echoppe
//
//  Created by d-exclaimation on 16:53.
//

import {useLoginMutation} from "@echoppe/common";
import React from "react";
import {Alert, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useColor} from "../../utils/hooks/color";
import {base} from "../../utils/styles";
import UserForm from "./shared/UserForm";
import {UserDestinations} from "./UserNavigator";

type Props = {
  navigate: (destination: UserDestinations) => void;
};

const SignIn: React.FC<Props> = ({navigate}) => {
  const login = useLoginMutation({
    onSuccess: () => {},
    onError: () => Alert.alert("Cannot login!", "Check your credentials"),
  });
  const {background} = useColor();
  return (
    <View style={[base.flex, background, {width: "100%", marginTop: "40%"}]}>
      <UserForm
        onSubmit={(email, password) =>
          login({
            login: {
              email,
              password,
            },
          })
        }
        header="Sign in to Echoppe"
        customOnTop
        footer={
          <TouchableOpacity onPressIn={() => navigate({pos: "sign-up"})}>
            <Text style={style.footer}>
              Don't have an account? Sign Up here
            </Text>
          </TouchableOpacity>
        }
      />
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
});

export default SignIn;
