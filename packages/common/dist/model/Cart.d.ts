import { User } from "./User";
export declare type CartList = {
    id: string;
    title: string;
    description: string;
    due_date: Date | null;
    updated_at: Date;
};
export declare type RawCart = Omit<Omit<CartList, "due_date">, "updated_at"> & {
    due_date: string | null;
    updated_at: string;
};
export declare type CartRoom = {
    data: RawCart;
};
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
