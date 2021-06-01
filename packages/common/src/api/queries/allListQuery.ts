//
//  allListQuery.ts
//  echoppe
//
//  Created by d-exclaimation on 16:54.
//
import { __endpoint__, __version__ } from "../../constants/index";
import { AllCarts } from "../../model/Cart";
import { parseCart } from "../../parser/parseCart";

export const allListQuery = async () => {
  try {
    const resp = await fetch(`${__endpoint__}/${__version__}/cart/all_list`, {
      method: "GET",
      credentials: "include",
    });
    const { data }: AllCarts = await resp.json();
    return data.map(parseCart);
  } catch (_) {
    return [];
  }
};
