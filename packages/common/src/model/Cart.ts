import { User } from "./User";

/**
 * CartList Details
 * - id
 * - Title of the Cart
 * - Quick Description
 * - Due Date
 * - Updated At (for sorting)
 */
export type CartList = {
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
export type RawCart = Omit<Omit<CartList, "due_date">, "updated_at"> & {
  due_date: string | null;
  updated_at: string;
};

/**
 * Fetched Singular Cart response
 */
export type CartRoom = {
  data: RawCart;
};

/**
 * Fetched All Carts response
 */
export type AllCarts = {
  data: RawCart[];
};

export type CartJoinMessage = { user: User };
export type CartLeaveMessage = { user: User };
export type CartJoinEvent = (resp: CartJoinMessage) => void;
export type CartLeaveEvent = (resp: CartJoinMessage) => void;
export type CartItem = {};
