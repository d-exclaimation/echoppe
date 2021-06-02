export namespace Channel {
  export type Payload = object;

  export type Subscriptions = {
    [event: string]: OnEvent;
  };

  export type OnEvent = (resp: any) => void;
  export type ErrorResponse = {
    reason: string;
  };
}
