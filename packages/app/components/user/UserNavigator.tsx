//
//  UserNavigator.tsx
//  echoppe
//
//  Created by d-exclaimation on 16:12.
//

import {AuthContext, enqueue} from "@echoppe/common";
import React, {useContext, useState} from "react";
import {Text} from "react-native";
import {AppDestinations} from "../../App";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

export type UserDestinations = {pos: "sign-in"} | {pos: "sign-up"};

type Props = {
  initSubPos: "sign-in" | "sign-up";
  navigate: (destination: AppDestinations) => void;
};

const UserNavigator: React.FC<Props> = ({initSubPos, navigate}) => {
  const {isLoading, isLoggedIn} = useContext(AuthContext);
  const [current, setCurrent] = useState<UserDestinations>({pos: initSubPos});
  if (!isLoading && isLoggedIn) {
    enqueue(() => navigate({pos: "home"}));
    return <Text>Redirecting...</Text>;
  }

  switch (current.pos) {
    case "sign-in":
      return <SignIn navigate={setCurrent} />;
    case "sign-up":
      return <SignUp navigate={setCurrent} />;
    default:
      enqueue(() => setCurrent({pos: "sign-in"}));
      return <Text>404</Text>;
  }
};

export default UserNavigator;
