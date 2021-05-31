export declare function useAuth(): {
    isLoading: boolean;
    isLoggedIn: boolean;
    user: import("..").User | null | undefined;
};
declare type LoginSideEffects = {
    onSuccess: () => void;
    onError: () => void;
};
export declare function useLogin({ onSuccess, onError }: LoginSideEffects): import("react-query").UseMutateFunction<import("..").User, unknown, import("..").UserCredentials, unknown>;
export {};
