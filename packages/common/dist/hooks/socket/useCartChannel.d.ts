import { User } from "../../model/User";
import { CartList } from "./../../model/Cart";
import { Channel } from "./../../model/Channel";
/** Types of error handling callbacks */
declare type ErrorHandler = {
    joinError?: (resp: Channel.ErrorResponse) => void;
    pushError?: () => void;
};
/**
 * ~Abstraction on top useChannel for handling Cart Room Channel~
 *
 * TODO: Some the functionalities are temporarily
 * - `items` should be replaced with state of the cart and all of its items
 * - `insert` should be using a better event name
 * - missing `update`, `delete` function if these functionalities are seperated
 *
 * @returns all the states and `insert` function to broadcast changes
 */
export declare function useCartChannel(id: string, user: User | null, { pushError, joinError }?: ErrorHandler): {
    insert: (res: {
        msg: string;
        user: User;
    }) => void;
    cart: CartList | null;
    items: string[];
};
export {};
