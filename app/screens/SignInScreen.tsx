import * as React from "react";
import { useContext, useState } from "react";
import { Text, View } from "react-native";
import { AuthContext } from "../auth/UserContext";
import { InputField, TouchButton } from "../components/shared/core";
import TabScreen from "../components/shared/TabScreen";

export default function SignInScreen() {
  const auth = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  if (auth.type === "logged-in") return null;

  const submit = () => {
    auth.authenticate(email, pass);
  };

  return (
    <TabScreen>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "white",
            paddingHorizontal: "1rem",
            paddingVertical: "2rem",
            borderRadius: 10,
            borderLeftWidth: 10,
            borderLeftColor: "#ccccaa",
          }}
        >
          <Text
            style={{
              fontSize: 24,
              textAlign: "center",
              width: "30rem",
              maxWidth: "80vw",
              padding: "1.5rem",
            }}
          >
            Sign In
          </Text>
          <View style={{ marginTop: "2.5rem" }}>
            <View style={{ width: "100%", marginVertical: "1vmin" }}>
              <InputField placeHolder="Email" />
            </View>
            <View style={{ width: "100%", marginVertical: "1vmin" }}>
              <InputField secure placeHolder="Password" />
            </View>
            <View
              style={{
                justifyContent: "center",
                marginTop: "1.5rem",
                alignItems: "center",
              }}
            >
              <TouchButton>Sign in</TouchButton>
            </View>
          </View>
        </View>
      </View>
    </TabScreen>
  );
}
