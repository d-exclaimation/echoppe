import { Channel } from "../../model/Channel";
/**
 * useChannel hooks for handling phoenix channel subscriptions and broadcasting using provided Socket from context.
 *
 * Subscriptions are callbacks from events which includes on initial join and error response
 * - `init` takes a generic parameter InitParams (server `join/3` response)
 * - `error` takes a generic parameter ErrorResponse (server `join/3` response)
 * - `[any-event: string]` takes client-defined params (server `handle_in/3` response)
 * @returns push message to event function
 */
export declare function useChannel<InitParams extends object, InitPayload extends object, ErrorResponse extends object>(key: string, initPayload?: InitPayload, subs?: Channel.Subscriptions & {
    init: (resp: InitParams) => void;
    error: (resp: ErrorResponse) => void;
}): (event: string, payload: Channel.Payload) => import("phoenix").Push | undefined;
