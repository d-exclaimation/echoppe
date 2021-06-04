import { QueryFunction, QueryKey, UseQueryOptions, UseQueryResult } from "react-query";
/** Fallback function when getting an error, takes the error thrown and failed data */
declare type FallbackFunction<TData, TError> = (given: {
    error: TError | null;
    data: TData | undefined;
}) => TData;
/** Abstraction on top UseQueryResult with no error and always defined data */
declare type UseFallbackQueryResult<TData, TError> = Omit<Omit<UseQueryResult<TData, TError>, "error">, "data"> & {
    data: TData;
};
/**
 * useQuery but with a fallback for failure on data, rather than catching on error
 *
 * use `null` for optional data types as undefined is used by react-query for data is still not there
 *
 * @param fallback Function called if `queryFn` throws anything, the throwned object and the faulty data will passed as parameter
 * @returns UseQueryResult wihout the error field and with the data is always defined
 */
export declare function useFallbackQuery<TData = unknown, TError = unknown, TQueryKey extends QueryKey = QueryKey>(queryKey: TQueryKey, queryFn: QueryFunction<TData, TQueryKey>, fallback: FallbackFunction<TData, TError>, options?: UseQueryOptions<TData, TError, TData, TQueryKey>): UseFallbackQueryResult<TData, TError>;
export {};
