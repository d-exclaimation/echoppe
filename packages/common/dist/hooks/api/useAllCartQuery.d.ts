/**
 * Abstraction on top of useQuery for fetching all the cart lists
 * @returns data and isLoading state
 */
export declare function useAllCartQuery(): {
    data: import("../..").CartList[];
    isLoading: boolean;
};
