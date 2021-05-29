import * as React from "react";
import { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Card, TextInput, Title } from "react-native-paper";
import { AuthContext } from "../auth/UserContext";
import TabScreen from "../components/shared/TabScreen";

export default function SignInScreen() {
  const auth = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  if (auth.type === "logged-in") return null;

  const password = pass
    .split("")
    .map(() => "*")
    .join("");

  const submit = () => {
    auth.authenticate(email, pass);
  };

  return (
    <TabScreen>
      <Card style={{ width: "80vmin", height: "40%" }} elevation={10}>
        <Card.Content>
          <View
            style={{
              width: "100%",
              height: "35vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Title style={{ margin: "1vmin" }}>Sign in</Title>
            <TextInput
              value={email}
              label="Email"
              style={{ width: "90%" }}
              onChangeText={(text) => setEmail(text)}
            />
            <TextInput
              value={password}
              label="Password"
              style={{ width: "90%" }}
              onChangeText={(text) => setPass(text)}
            />
            <View
              style={{
                margin: "1vmin",
                display: "flex",
                width: "90%",
                alignItems: "flex-end",
                justifyContent: "flex-end",
              }}
            >
              <Button color="#d9be6c" mode="contained" onPress={submit}>
                Submit
              </Button>
            </View>
          </View>
        </Card.Content>
      </Card>
    </TabScreen>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
