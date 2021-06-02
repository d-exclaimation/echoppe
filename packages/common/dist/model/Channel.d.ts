export declare namespace Channel {
    type Payload = object;
    type Subscriptions = {
        [event: string]: OnEvent;
    };
    type OnEvent = (resp: any) => void;
    type ErrorResponse = {
        reason: string;
    };
}
