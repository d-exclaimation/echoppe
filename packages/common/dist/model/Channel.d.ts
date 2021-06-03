/**
 * Channel Namespaces for channel specific types
 */
export declare namespace Channel {
    /**
     * Channel Payload, any object that matches server requirements
     */
    type Payload = object;
    /**
     * Event key-based subscriptions on broadcasted response.
     * The key is reflected on the name of the function
     */
    type Subscriptions = {
        [event: string]: OnEvent;
    };
    /**
     * Event callback takes response of Payload, error, channel reference id
     */
    type OnEvent = (resp: any) => void;
    /**
     * Error Response on join channel
     */
    type ErrorResponse = {
        reason: string;
    };
}
