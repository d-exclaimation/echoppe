declare type UpdateSideEffects = {
    onSuccess: () => void;
    onError: () => void;
};
/**
 * Abstractions on top ose useMutation for updating a singular cart
 *
 * @returns
 */
export declare function useUpdateCartMutations({ onError, onSuccess, }: UpdateSideEffects): import("react-query").UseMutateFunction<import("../..").CartList, unknown, {
    id: string;
    body: import("../..").CartDTO;
    token: string;
}, unknown>;
export {};
