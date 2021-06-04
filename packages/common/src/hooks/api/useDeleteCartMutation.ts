//
//  useDeleteCartMutation.ts
//  echoppe
//
//  Created by d-exclaimation on 22:07.
//

import { useMutation, useQueryClient } from "react-query";
import { deleteCartMutation } from "../../api/mutations/deleteCartMutation";

type UpdateSideEffects = {
  onSuccess: () => void;
  onError: () => void;
};

/**
 * Abstractions on top ose useMutation for deleting cart
 *
 * @returns
 */
export function useDeleteCartMutation({
  onError,
  onSuccess,
}: UpdateSideEffects) {
  const client = useQueryClient();
  const { mutate } = useMutation(deleteCartMutation, {
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
