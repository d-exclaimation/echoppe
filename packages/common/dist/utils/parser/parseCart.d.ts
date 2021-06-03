import { CartList } from "../../model/Cart";
/**
 * Parse RawCart into CartList
 */
export declare const parseCart: ({ id, title, description, due_date, updated_at, }: Omit<Omit<CartList, "due_date">, "updated_at"> & {
    due_date: string | null;
    updated_at: string;
}) => CartList;
