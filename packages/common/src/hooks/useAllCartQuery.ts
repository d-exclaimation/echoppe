//
//  useAllCartQuery.ts
//  echoppe
//
//  Created by d-exclaimation on 19:37.
//
import { allListQuery } from "./../api/allListQuery";
import { useFallbackQuery } from "./useFallbackQuery";

export function useAllCartQuery() {
  const { data, isLoading } = useFallbackQuery(
    "all-cart-lists",
    allListQuery,
    () => []
  );
  return {
    data,
    isLoading,
  };
}
