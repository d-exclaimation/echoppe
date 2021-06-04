import { CartDTO } from "./../../model/Cart";
/** `POST` Request to create a new cart list */
export declare const newCartMutation: (item: {
    body: CartDTO;
    token: string;
}) => Promise<import("./../../model/Cart").CartList>;
