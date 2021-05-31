//
//  parseCart.ts
//  echoppe
//
//  Created by d-exclaimation on 17:21.
//
import { CartList } from "../model/Cart";

export const parseCart = ({
  id,
  title,
  description,
  due_date,
}: Omit<CartList, "due_date"> & { due_date: string }): CartList => ({
  id,
  title,
  description,
  due_date: new Date(due_date),
});
