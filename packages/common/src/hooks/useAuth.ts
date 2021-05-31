import { useMutation, useQuery, useQueryClient } from "react-query";
import { loginMutation } from "../api/loginMutation";
import { meQuery } from "./../api/meQuery";

export function useAuth() {
  const { isLoading, error, data } = useQuery("user-session", meQuery);
  return {
    isLoading,
    isLoggedIn: !error && !!data,
    user: data,
  };
}

type LoginSideEffects = {
  onSuccess: () => void;
  onError: () => void;
};

export function useLogin({ onSuccess, onError }: LoginSideEffects) {
  const client = useQueryClient();
  const { mutate } = useMutation(loginMutation, {
    onSuccess: () => {
      client.invalidateQueries("user-session");
      onSuccess();
    },
    onError,
  });

  return mutate;
}
