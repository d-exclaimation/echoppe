//
//  useNewCartMutation.ts
//  echoppe
//
//  Created by d-exclaimation on 20:27.
//

import { useMutation, useQueryClient } from "react-query";
import { newCartMutation } from "../../api/mutations/newCartMutation";

type UpdateSideEffects = {
  onSuccess: () => void;
  onError: () => void;
};

/**
 * Abstractions on top ose useMutation for creating cart
 *
 * @returns
 */
export function useNewCartMutation({ onError, onSuccess }: UpdateSideEffects) {
  const client = useQueryClient();
  const { mutate } = useMutation(newCartMutation, {
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
