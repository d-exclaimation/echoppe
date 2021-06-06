/**
 * CartList Details
 */
export type CartList = {
  id: string;
  title: string;
  description: string;
  due_date: Date | null;
  updated_at: Date;
};

/**
 * Cart Data Transfer Object
 */
export type CartDTO = {
  title: string;
  description: string;
  due_date?: string | null;
};

/**
 * RawCart JSON Value.
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
export type Cart = {
  data: RawCart;
};

/**
 * Fetched All Carts response
 */
export type AllCarts = {
  data: RawCart[];
};

export type CartItem = {
  id: string;
  label: string;
  price: number;
};

export type CartItemDTO = {
  label: string;
  price: number;
};
