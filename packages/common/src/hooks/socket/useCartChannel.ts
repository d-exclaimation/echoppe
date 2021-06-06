//
//  useCartChannel.ts
//  echoppe
//
//  Created by d-exclaimation on 20:47.
//
import { useCallback, useMemo, useState } from "react";
import { User } from "../../model/User";
import { parseCart } from "../../utils/parser/parseCart";
import { CartItem, CartItemDTO, CartList, RawCart } from "./../../model/Cart";
import { Channel } from "./../../model/Channel";
import { optional } from "./../../utils/optional/function";
import { useChannel } from "./useChannel";

/** Types of error handling callbacks */
type ErrorHandler = {
  joinError?: (resp: Channel.ErrorResponse) => void;
  pushError?: () => void;
};

/** @internal */
const defaultErrorHandler = {
  joinError: () => {},
  pushError: () => {},
};

/** Initial Payload to given to the server */
type UserJoin = {
  user: User | null;
};

/** Initial Payload to receive from the server */
type InitPayload = {
  items: CartItem[];
  list: RawCart;
};

/** Insert Payload */
type UpdatePayload = {
  payload: CartItem;
};

/**
 * ~Abstraction on top useChannel for handling Cart Room Channel~
 *
 * TODO: Some the functionalities are temporarily
 * - `items` should be replaced with state of the cart and all of its items
 * - `insert` should be using a better event name
 * - missing `update`, `delete` function if these functionalities are seperated
 *
 * @returns all the states and `insert` function to broadcast changes
 */
export function useCartChannel(
  id: string,
  user: User | null,
  { pushError, joinError }: ErrorHandler = defaultErrorHandler
) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [cart, setCart] = useState<CartList | null>(null);

  // using useChannel Hook providing, only one event of `data`
  const initPayload: UserJoin = useMemo(() => ({ user }), [user]);
  const push = useChannel(`cart:${id}`, initPayload, {
    insert: ({ payload }: UpdatePayload) => {
      setItems((prev) => [...prev, payload]);
    },

    delete: ({ payload }: UpdatePayload) => {
      setItems((prev) => prev.filter((item) => item.id != payload.id));
    },

    // required event subscriptions, join will gives use cart details which is set as state
    init: ({ items, list }: InitPayload) => {
      console.log("this is reloaded");
      setItems(items);
      setCart(parseCart(list));
    },

    // set the joinError optionally otherwise gives a blank function
    error: optional(joinError),
  });

  // Insert uses the data event to pass a payload, and all the error will be handle optionally
  const insert = useCallback(
    (item: CartItemDTO) => {
      push("insert", { item })?.receive("error", optional(pushError));
    },
    [push, initPayload]
  );

  const remove = useCallback(
    (item: CartItem) => {
      push("delete", { id: item.id })?.receive("error", optional(pushError));
    },
    [push, initPayload]
  );

  return { insert, cart, items, remove };
}
