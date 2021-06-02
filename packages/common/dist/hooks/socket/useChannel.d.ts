import { Channel } from "../../model/Channel";
export declare function useChannel<T>(id: string, subscriptions: Channel.Subscriptions & {
    init: (resp: T) => void;
}): (event: string, payload: Channel.Payload) => import("phoenix").Push | undefined;
