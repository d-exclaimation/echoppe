//
//  parseCart.ts
//  echoppe
//
//  Created by d-exclaimation on 17:21.
//
import { CartList } from "../../model/Cart";

/**
 * Parse RawCart into CartList
 */
export const parseCart = ({
  id,
  title,
  description,
  due_date,
  updated_at,
}: Omit<Omit<CartList, "due_date">, "updated_at"> & {
  due_date: string | null;
  updated_at: string;
}): CartList => ({
  id,
  title,
  description,
  due_date: due_date ? new Date(due_date) : null,
  updated_at: new Date(updated_at),
});
