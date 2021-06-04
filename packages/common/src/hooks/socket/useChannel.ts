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
 * useChannel hooks for handling phoenix channel subscriptions and broadcasting using provided Socket from context.
 *
 * Subscriptions are callbacks from events which includes on initial join and error response
 * - `init` takes a generic parameter InitParams (server `join/3` response)
 * - `error` takes a generic parameter ErrorResponse (server `join/3` response)
 * - `<any_event>` takes client-defined params (server `handle_in/3` response)
 * @returns push message to event function
 */
export function useChannel<
  InitParams extends object,
  InitPayload extends object,
  ErrorResponse extends object
>(
  key: string,
  initPayload?: InitPayload,
  subs: Channel.Subscriptions & {
    init: (resp: InitParams) => void;
    error: (resp: ErrorResponse) => void;
  } = defaultHandler
) {
  // Grab sockets from context , initialize channel mutatable referrences
  const socket = useContext(SocketContext);
  const channelRef = useRef<PhoenixChannel | null>(null);

  // To bypass shallow comparison for useEffect
  const initPayloadRef = (() => JSON.stringify(initPayload))();

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
    channelRef.current = socket.channel(key, initPayload ? initPayload : {});
    channelRef.current
      .join()
      .receive("ok", subs.init)
      .receive("error", subs.error);

    // Applying all subscriptions filtering `init` and `error`
    const refs: [string, number | undefined][] = Object.entries(subs).map(
      ([key, resolver]) => [
        key,
        channelRef.current!.on(key, (resp) => resolver(resp)),
      ]
    );

    // Clean out by leaving channels and unsubscribing
    return () => {
      refs.forEach(([key, ref]) => channelRef.current?.off(key, ref));
      channelRef.current?.leave();
    };
  }, [key, initPayloadRef]);

  return pushMessage;
}
