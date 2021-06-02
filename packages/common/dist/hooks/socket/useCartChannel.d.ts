import { User } from "../../model/User";
import { CartList } from "./../../model/Cart";
export declare function useCartChannel(id: string): {
    insert: (res: {
        msg: string;
        user: User;
    }) => void;
    cart: CartList | null;
    items: string[];
};
