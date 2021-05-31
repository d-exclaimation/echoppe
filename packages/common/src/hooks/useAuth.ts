import { useMutation, useQueryClient } from "react-query";
import { loginMutation } from "../api/loginMutation";
import { meQuery } from "./../api/meQuery";
import { useFallbackQuery } from "./useFallbackQuery";

export function useAuth() {
  const { isLoading, data } = useFallbackQuery(
    "user-session",
    meQuery,
    () => null
  );
  return {
    isLoading,
    isLoggedIn: !!data,
    user: data,
  };
}

type LoginSideEffects = {
  onSuccess: () => void;
  onError: () => void;
};

export function useLoginMutation({ onSuccess, onError }: LoginSideEffects) {
  const client = useQueryClient();
  const { mutate } = useMutation(loginMutation, {
    onSuccess: () => {
      client.invalidateQueries({
        predicate: (query) => query.queryKey == "",
      });
      client.invalidateQueries("all-cart-lists");
      client.invalidateQueries("user-session");
      onSuccess();
    },
    onError,
  });

  return mutate;
}
