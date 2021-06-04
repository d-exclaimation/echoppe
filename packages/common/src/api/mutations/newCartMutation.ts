//
//  newCartMutation.ts
//  echoppe
//
//  Created by d-exclaimation on 20:25.
//

import { __endpoint__, __version__ } from "../../constants";
import { parseCart } from "../../utils/parser/parseCart";
import { Cart, CartDTO } from "./../../model/Cart";

/** `POST` Request to create a new cart list */
export const newCartMutation = async (item: {
  body: CartDTO;
  token: string;
}) => {
  const resp = await fetch(`${__endpoint__}/${__version__}/cart/new`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({ list: item.body }),
    redirect: "follow",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token": item.token,
    },
  });
  const { data }: Cart = await resp.json();
  return parseCart(data);
};
