//
//  useCartChannel.ts
//  echoppe
//
//  Created by d-exclaimation on 20:47.
//
import { useCallback, useState } from "react";
import { User } from "../../model/User";
import { parseCart } from "../../utils/parser/parseCart";
import { CartList, RawCart } from "./../../model/Cart";
import { useChannel } from "./useChannel";

export function useCartChannel(id: string) {
  const [items, setItems] = useState<string[]>([]);
  const [cart, setCart] = useState<CartList | null>(null);
  const push = useChannel(id, {
    data: ({ msg, user }: { msg: string; user: User }) =>
      setItems((prev) => [...prev, `${user.username}: ${msg}`]),
    init: ({ data, list }: { data: string[]; list: RawCart }) => {
      setItems(data);
      setCart(parseCart(list));
    },
  });

  const insert = useCallback(
    (res: { msg: string; user: User }) => {
      push("data", res);
    },
    [push]
  );

  return { insert, cart, items };
}
