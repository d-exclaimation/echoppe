//
//  deleteMutation.ts
//  echoppe
//
//  Created by d-exclaimation on 22:02.
//

import { Cart } from "../..";
import { __endpoint__, __version__ } from "../../constants";
import { parseCart } from "../../utils/parser/parseCart";

export const deleteCartMutation = async (item: {
  id: string;
  token: string;
}) => {
  const resp = await fetch(
    `${__endpoint__}/${__version__}/cart/delete/${item.id}`,
    {
      method: "DELETE",
      credentials: "include",
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
