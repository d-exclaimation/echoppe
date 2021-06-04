declare type UpdateSideEffects = {
    onSuccess: () => void;
    onError: () => void;
};
/**
 * Abstractions on top ose useMutation for creating cart
 *
 * @returns
 */
export declare function useNewCartMutation({ onError, onSuccess }: UpdateSideEffects): import("react-query").UseMutateFunction<import("../..").CartList, unknown, {
    body: import("../..").CartDTO;
    token: string;
}, unknown>;
export {};
