import { useMutation, useQuery, useQueryClient } from "react-query";
import { loginMutation } from "../../api/mutations/loginMutation";
import { meQuery } from "../../api/queries/meQuery";
import { parseCookie } from "../../utils/parser/parseCookie";
import { useFallbackQuery } from "../query/useFallbackQuery";
import { signOutMutation } from "./../../api/mutations/signOutMutation";
import { signUpMutation } from "./../../api/mutations/signUpMutation";
import { prequest } from "./../../api/queries/prequest";

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
      client.invalidateQueries("one-time-token");
      client.invalidateQueries("all-cart-lists");
      client.invalidateQueries("user-session");
      onSuccess();
    },
    onError,
    retry: 2,
  });

  return mutate;
}

/**
 * Abstraction on to useMutation specific for sign up for echoppe's server
 * This function invalidates caches of `user-session` query and `all-cart-lists` query
 *
 * @returns the mutation function to fetch request and invalidates queries' cache
 */
export function useSignUpMutation({ onSuccess, onError }: LoginSideEffects) {
  const client = useQueryClient();
  const { mutate } = useMutation(signUpMutation, {
    onSuccess: () => {
      client.invalidateQueries("one-time-token");
      client.invalidateQueries("all-cart-lists");
      client.invalidateQueries("user-session");
      onSuccess();
    },
    onError,
    retry: 2,
  });

  return mutate;
}

/**
 * Abstraction on to useMutation specific for signout for echoppe's server
 * This function invalidates caches of `user-session` query and `all-cart-lists` query
 *
 * @returns the mutation function to fetch request and invalidates queries' cache
 */
export function useSignOutMutation({ onSuccess, onError }: LoginSideEffects) {
  const client = useQueryClient();
  const { mutate } = useMutation(signOutMutation, {
    onSuccess: () => {
      client.invalidateQueries("one-time-token");
      client.invalidateQueries("all-cart-lists");
      client.invalidateQueries("user-session");
      onSuccess();
    },
    onError,
    retry: 2,
  });

  return mutate;
}

/**
 * Abstraction on useQuery for fetching on time token
 *
 * @returns the fetching function
 */

export function usePrequest() {
  const { data, isLoading, isError, refetch } = useQuery(
    "one-time-token",
    prequest,
    {
      retry: 0,
    }
  );
  if (data && !isError && !isLoading) {
    const cookies = parseCookie();
    return {
      isLoadingToken: isLoading,
      isTokenError: isError,
      token: cookies.get("csrf-token") ?? null,
      refetch,
    };
  }
  return {
    isErrorToken: isError,
    isLoadingToken: isLoading,
    token: null,
    refetch,
  };
}
