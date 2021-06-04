import { CartDTO } from "./../../model/Cart";
/** `PUT` Request Update singular cart mutations */
export declare const updateCartMutations: (item: {
    id: string;
    body: CartDTO;
    token: string;
}) => Promise<import("./../../model/Cart").CartList>;
