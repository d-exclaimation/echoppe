//
//  HomeNavigator.tsx
//  echoppe
//
//  Created by d-exclaimation on 15:35.
//

import {AuthContext, enqueue} from "@echoppe/common";
import React, {useContext, useState} from "react";
import {ActivityIndicator, Text} from "react-native";
import {AppDestinations} from "../../App";
import CartRoom from "./CartRoom";
import CartsView from "./CartsView";

export type HomeDestinations =
  | {pos: "cartview"}
  | {pos: "cartroom"; payload: string};

type Props = {
  navigate: (nav: AppDestinations) => void;
};

const HomeNavigator: React.FC<Props> = ({navigate}) => {
  const {isLoading, isLoggedIn} = useContext(AuthContext);
  const [current, setCurrent] = useState<HomeDestinations>({pos: "cartview"});

  if (isLoading) {
    return <ActivityIndicator size="large" color="#FEEBC8" />;
  }

  if (!isLoading && !isLoggedIn) {
    enqueue(() => navigate({pos: "user", subpos: "sign-in"}));
    return <Text>Redirecting...</Text>;
  }

  switch (current.pos) {
    case "cartview":
      return <CartsView navigate={setCurrent} />;
    case "cartroom":
      return <CartRoom id={current.payload} />;
    default:
      enqueue(() => setCurrent({pos: "cartview"}));
      return <Text>Hello from HomeViewModel</Text>;
  }
};

export default HomeNavigator;
