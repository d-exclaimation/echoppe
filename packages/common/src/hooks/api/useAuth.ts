import { useMutation, useQueryClient } from "react-query";
import { loginMutation } from "../../api/mutations/loginMutation";
import { meQuery } from "../../api/queries/meQuery";
import { useFallbackQuery } from "../query/useFallbackQuery";

/**
 * Abstraction on to useQuery specific for validating user session for echoppe's server
 *
 * @returns an object containing the isLoading, isLoggedIn, and User state
 */
export function useAuth() {
  const { isLoading, data } = useFallbackQuery(
    "user-session",
    meQuery,
    () => null,
    { retry: 1 }
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

/**
 * Abstraction on to useMutation specific for login for echoppe's server
 * This function invalidates caches of `user-session` query and `all-cart-lists` query
 *
 * @returns the mutation function to fetch request and invalidates queries' cache
 */
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
    retry: 2,
  });

  return mutate;
}
