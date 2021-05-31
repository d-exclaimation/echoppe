import { CartList } from "../model/Cart";
export declare const parseCart: ({ id, title, description, due_date, }: Omit<CartList, "due_date"> & {
    due_date: string;
}) => CartList;
