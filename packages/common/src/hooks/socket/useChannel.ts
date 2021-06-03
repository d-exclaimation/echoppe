//
//  useChannel.ts
//  echoppe
//
//  Created by d-exclaimation on 17:32.
//
import { Channel as PhoenixChannel } from "phoenix";
import { useCallback, useContext, useEffect, useRef } from "react";
import { SocketContext } from "../../context/sockets/SocketContext";
import { Channel } from "../../model/Channel";

/** @internal */
const defaultHandler = {
  init: () => {},
  error: () => {},
};

/**
 * useChannel hooks for handling phoenix channel subscriptions and broadcasting.
 *
 * Takes an id for the channel key, an initial join payload, and subscriptions
 *
 * Subscriptions includes on initial join response and join error response
 *
 * Required events
 * - `init` takes a generic parameter InitParams (server `join/3` response)
 * - `error` takes a generic parameter ErrorResponse (server `join/3` response)
 *
 * Required Context
 * - Sockets atm can be fetched from the context (just the socket inside the context, check line 58)
 * ---
 * Note:
 * - Add in types for other event subscriptions
 *
 * Example:
 * ```ts
 * type ShoutEvent = { msg: string; user: User; };
 * // provided `init` and `error` is already given
 * const push = useChannel("room:lobby", {}, { ..., shout: ({msg, user}: ShoutEvent) => {...}});
 * ```
 * ---
 * @template InitParams initial payload given by the server on `join/3`
 * @template InitPayload initial payload given to the server on `join/3`'s second parameter
 * @template ErrorResponse initial payload given back if an error occured on `join/3`
 */
export function useChannel<
  InitParams extends object,
  InitPayload extends object,
  ErrorResponse extends object
>(
  id: string,
  initPayload: InitPayload | undefined,
  subs: Channel.Subscriptions & {
    init: (resp: InitParams) => void;
    error: (resp: ErrorResponse) => void;
  } = defaultHandler
) {
  // Grab sockets from context , initialize channel mutatable referrences
  const socket = useContext(SocketContext);
  const channelRef = useRef<PhoenixChannel | null>(null);

  // Create a fucntion to describe the return value
  const pushMessage = useCallback(
    (event: string, payload: Channel.Payload) => {
      if (!channelRef.current) return;
      return channelRef.current.push(event, payload, 1000);
    },
    [channelRef]
  );

  // Initial setup, create channel, join and response accordingly
  useEffect(() => {
    channelRef.current = socket.channel(id, initPayload ? initPayload : {});
    channelRef.current
      .join()
      .receive("ok", subs.init)
      .receive("error", subs.error);

    // Applying all subscriptions filtering `init` and `error`
    const refs: [string, number | undefined][] = Object.entries(subs)
      .filter(([key, _]) => key !== "init" && key === "error")
      .map(([key, resolver]) => [
        key,
        channelRef.current!.on(key, (resp) => resolver(resp)),
      ]);

    // Clean out by leaving channels and unsubscribing
    return () => {
      refs.forEach(([key, ref]) => channelRef.current?.off(key, ref));
      channelRef.current?.leave();
    };
  }, [id, initPayload]);

  return pushMessage;
}
