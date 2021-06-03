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

/** ~Initial Payload to given to the server~ **still temporarily**  */
type UserJoin = {
  user: User | null;
};

/** ~Initial Payload to receive from the server~ **still temporarily**  */
type InitPayload = {
  data: string[];
  list: RawCart;
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
  // Temporarily states holding the current cart and items (atm strings)
  const [items, setItems] = useState<string[]>([]);
  const [cart, setCart] = useState<CartList | null>(null);

  // using useChannel Hook providing, only one event of `data`
  const initPayload: UserJoin = { user };
  const push = useChannel(`cart:${id}`, initPayload, {
    // `data` event gives msg and user which will just temp put into items state
    data: ({ msg, user }: { msg: string; user: User }) =>
      setItems((prev) => [...prev, `${user.username}: ${msg}`]),

    // required event subscriptions, join will gives use cart details which is set as state
    init: ({ data, list }: InitPayload) => {
      setItems(data);
      setCart(parseCart(list));
    },

    // set the joinError optionally otherwise gives a blank function
    error: optional(joinError),
  });

  // Insert uses the data event to pass a payload, and all the error will be handle optionally
  const insert = useCallback(
    (res: { msg: string; user: User }) => {
      push("data", res)?.receive("error", optional(pushError));
    },
    [push]
  );

  return { insert, cart, items };
}
