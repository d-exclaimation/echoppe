import { useMutation, useQueryClient } from "react-query";
import { updateCartMutations } from "../../api/mutations/updateCartMutations";

type UpdateSideEffects = {
  onSuccess: () => void;
  onError: () => void;
};

/**
 * Abstractions on top ose useMutation for updating a singular cart
 *
 * @returns
 */
export function useUpdateCartMutations({
  onError,
  onSuccess,
}: UpdateSideEffects) {
  const client = useQueryClient();
  const { mutate } = useMutation(updateCartMutations, {
    onSuccess: () => {
      client.invalidateQueries("one-time-token");
      client.invalidateQueries("all-cart-lists");
      onSuccess();
    },
    onError,
    retry: 0,
  });

  return mutate;
}
