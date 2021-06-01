export type CartList = {
  id: string;
  title: string;
  description: string;
  due_date: Date | null;
  updated_at: Date;
};

export type AllCarts = {
  data: (Omit<Omit<CartList, "due_date">, "updated_at"> & {
    due_date: string | null;
    updated_at: string;
  })[];
};
