/**
 * CartList Details
 */
export declare type CartList = {
    id: string;
    title: string;
    description: string;
    due_date: Date | null;
    updated_at: Date;
};
/**
 * Cart Data Transfer Object
 */
export declare type CartDTO = {
    title: string;
    description: string;
    due_date?: string | null;
};
/**
 * RawCart JSON Value.
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
export declare type Cart = {
    data: RawCart;
};
/**
 * Fetched All Carts response
 */
export declare type AllCarts = {
    data: RawCart[];
};
export declare type CartItem = {};
