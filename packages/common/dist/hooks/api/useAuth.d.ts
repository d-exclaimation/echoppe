export declare function useAuth(): {
    isLoading: boolean;
    isLoggedIn: boolean;
    user: import("../..").User | null;
};
declare type LoginSideEffects = {
    onSuccess: () => void;
    onError: () => void;
};
export declare function useLoginMutation({ onSuccess, onError }: LoginSideEffects): import("react-query").UseMutateFunction<import("../..").User, unknown, import("../..").UserCredentials, unknown>;
export {};
