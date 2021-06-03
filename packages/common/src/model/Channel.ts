/**
 * Channel Namespaces for channel specific types
 */
export namespace Channel {
  /**
   * Channel Payload, any object that matches server requirements
   */
  export type Payload = object;

  /**
   * Event key-based subscriptions on broadcasted response.
   * The key is reflected on the name of the function
   */
  export type Subscriptions = {
    [event: string]: OnEvent;
  };

  /**
   * Event callback takes response of Payload, error, channel reference id
   */
  export type OnEvent = (resp: any) => void;

  /**
   * Error Response on join channel
   */
  export type ErrorResponse = {
    reason: string;
  };
}
