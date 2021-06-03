/**
 * Abstraction on to useQuery specific for validating user session for echoppe's server
 *
 * Returns:
 * - `isLoading` boolean hinting whether request is still on going
 * - `isLoggedIn` boolean checking where user session is valid (user is logged in)
 * - `user` user data given by user session of type `Optional<User>` or `User | null`
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
export {};
