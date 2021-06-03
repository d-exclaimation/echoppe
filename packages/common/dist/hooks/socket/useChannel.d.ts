import { Channel } from "../../model/Channel";
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
export declare function useChannel<InitParams extends object, InitPayload extends object, ErrorResponse extends object>(id: string, initPayload: InitPayload | undefined, subs?: Channel.Subscriptions & {
    init: (resp: InitParams) => void;
    error: (resp: ErrorResponse) => void;
}): (event: string, payload: Channel.Payload) => import("phoenix").Push | undefined;
