import { User } from "./User";
/**
 * CartList Details
 * - id
 * - Title of the Cart
 * - Quick Description
 * - Due Date
 * - Updated At (for sorting)
 */
export declare type CartList = {
    id: string;
    title: string;
    description: string;
    due_date: Date | null;
    updated_at: Date;
};
/**
 * RawCart JSON Value <br/>
 * JSON does not come to parse UUID and Date all that well, so the date in encoded as string
 * and then parse as Date client side
 */
export declare type RawCart = Omit<Omit<CartList, "due_date">, "updated_at"> & {
    due_date: string | null;
    updated_at: string;
};
/**
 * Fetched Singular Cart response
 */
export declare type CartRoom = {
    data: RawCart;
};
/**
 * Fetched All Carts response
 */
export declare type AllCarts = {
    data: RawCart[];
};
export declare type CartJoinMessage = {
    user: User;
};
export declare type CartLeaveMessage = {
    user: User;
};
export declare type CartJoinEvent = (resp: CartJoinMessage) => void;
export declare type CartLeaveEvent = (resp: CartJoinMessage) => void;
export declare type CartItem = {};
