/**
 * Abstraction on to useQuery specific for validating user session for echoppe's server
 *
 * @returns an object containing the isLoading, isLoggedIn, and User state
 */
export declare function useAuth(): {
    isLoading: boolean;
    isLoggedIn: boolean;
    user: import("../..").User | null;
};
declare type LoginSideEffects = {
    onSuccess: () => void;
    onError: () => void;
};
/**
 * Abstraction on to useMutation specific for login for echoppe's server
 * This function invalidates caches of `user-session` query and `all-cart-lists` query
 *
 * @returns the mutation function to fetch request and invalidates queries' cache
 */
export declare function useLoginMutation({ onSuccess, onError }: LoginSideEffects): import("react-query").UseMutateFunction<import("../..").User, unknown, import("../..").UserCredentials, unknown>;
/**
 * Abstraction on to useMutation specific for sign up for echoppe's server
 * This function invalidates caches of `user-session` query and `all-cart-lists` query
 *
 * @returns the mutation function to fetch request and invalidates queries' cache
 */
export declare function useSignUpMutation({ onSuccess, onError }: LoginSideEffects): import("react-query").UseMutateFunction<import("../..").User, unknown, import("../..").SignUpCredentials, unknown>;
/**
 * Abstraction on to useMutation specific for signout for echoppe's server
 * This function invalidates caches of `user-session` query and `all-cart-lists` query
 *
 * @returns the mutation function to fetch request and invalidates queries' cache
 */
export declare function useSignOutMutation({ onSuccess, onError }: LoginSideEffects): import("react-query").UseMutateFunction<boolean, unknown, void, unknown>;
/**
 * Abstraction on useQuery for fetching on time token
 *
 * @returns the fetching function
 */
export declare function usePrequest(isWeb: boolean): {
    isLoadingToken: false;
    isTokenError: false;
    token: string | null;
    refetch: (options?: import("react-query").RefetchOptions | undefined) => Promise<import("react-query").QueryObserverResult<Headers, unknown>>;
    isErrorToken?: undefined;
} | {
    isErrorToken: boolean;
    isLoadingToken: boolean;
    token: null;
    refetch: (options?: import("react-query").RefetchOptions | undefined) => Promise<import("react-query").QueryObserverResult<Headers, unknown>>;
    isTokenError?: undefined;
};
export {};
