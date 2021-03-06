import { User } from "../../model/User";
import { CartItem, CartItemDTO, CartList } from "./../../model/Cart";
import { Channel } from "./../../model/Channel";
/** Types of error handling callbacks */
declare type ErrorHandler = {
    joinError?: (resp: Channel.ErrorResponse) => void;
    pushError?: () => void;
};
/**
 * ~Abstraction on top useChannel for handling Cart Room Channel~
 *
 * @returns all the states and `insert` function to broadcast changes
 */
export declare function useCartChannel(id: string, user: User | null, { pushError, joinError }?: ErrorHandler): {
    insert: (item: CartItemDTO) => void;
    cart: CartList | null;
    items: CartItem[];
    remove: (item: CartItem) => void;
};
export {};
