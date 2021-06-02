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

export function useChannel<T>(
  id: string,
  subscriptions: Channel.Subscriptions & { init: (resp: T) => void }
) {
  const socket = useContext(SocketContext);
  const channelRef = useRef<PhoenixChannel | null>(null);
  const pushMessage = useCallback(
    (event: string, payload: Channel.Payload) => {
      if (!channelRef.current) return;
      return channelRef.current.push(event, payload, 1000);
    },
    [channelRef]
  );
  useEffect(() => {
    channelRef.current = socket.channel(`cart:${id}`, {});
    channelRef.current
      .join()
      .receive("ok", subscriptions.init)
      .receive("error", (resp: Channel.ErrorResponse) => console.log(resp));

    const refs: [string, number | undefined][] = Object.entries(subscriptions)
      .filter(([key, _]) => key != "init")
      .map(([key, resolver]) => [
        key,
        channelRef.current!.on(key, (resp) => resolver(resp)),
      ]);

    return () => {
      channelRef.current?.leave();
      refs.forEach(([key, ref]) => channelRef.current?.off(key, ref));
    };
  }, [id]);

  return pushMessage;
}
