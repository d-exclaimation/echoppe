declare type UpdateSideEffects = {
    onSuccess: () => void;
    onError: () => void;
};
/**
 * Abstractions on top ose useMutation for deleting cart
 *
 * @returns
 */
export declare function useDeleteCartMutation({ onError, onSuccess, }: UpdateSideEffects): import("react-query").UseMutateFunction<import("../..").CartList, unknown, {
    id: string;
    token: string;
}, unknown>;
export {};
