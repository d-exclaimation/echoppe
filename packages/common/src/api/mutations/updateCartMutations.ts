//
//  updateCartMutations.ts
//  echoppe
//
//  Created by d-exclaimation on 16:26.
//
import { __endpoint__, __version__ } from "./../../constants/index";
import { Cart, CartDTO } from "./../../model/Cart";
import { parseCart } from "./../../utils/parser/parseCart";

/** `PUT` Request Update singular cart mutations */
export const updateCartMutations = async (item: {
  id: string;
  body: CartDTO;
  token: string;
}) => {
  const resp = await fetch(
    `${__endpoint__}/${__version__}/cart/update/${item.id}`,
    {
      method: "PUT",
      credentials: "include",
      body: JSON.stringify({ list: item.body }),
      redirect: "follow",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": item.token,
      },
    }
  );
  const { data }: Cart = await resp.json();
  return parseCart(data);
};
