//
//  useAllCartQuery.ts
//  echoppe
//
//  Created by d-exclaimation on 19:37.
//
import { allListQuery } from "../api/queries/allListQuery";
import { useFallbackQuery } from "./useFallbackQuery";

export function useAllCartQuery() {
  const { data, isLoading } = useFallbackQuery(
    "all-cart-lists",
    allListQuery,
    () => [],
    { retry: 0 }
  );
  return {
    data,
    isLoading,
  };
}
