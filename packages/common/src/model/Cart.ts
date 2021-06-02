import { User } from "./User";
export type CartList = {
  id: string;
  title: string;
  description: string;
  due_date: Date | null;
  updated_at: Date;
};

export type RawCart = Omit<Omit<CartList, "due_date">, "updated_at"> & {
  due_date: string | null;
  updated_at: string;
};

export type CartRoom = {
  data: RawCart;
};

export type AllCarts = {
  data: RawCart[];
};

export type CartJoinMessage = { user: User };
export type CartLeaveMessage = { user: User };
export type CartJoinEvent = (resp: CartJoinMessage) => void;
export type CartLeaveEvent = (resp: CartJoinMessage) => void;
export type CartItem = {};
