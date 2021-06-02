import { QueryFunction, QueryKey, UseQueryOptions, UseQueryResult } from "react-query";
declare type FallbackFunction<TData, TError> = (given: {
    error: TError | null;
    data: TData | undefined;
}) => TData;
declare type UseFallbackQueryResult<TData, TError> = Omit<Omit<UseQueryResult<TData, TError>, "error">, "data"> & {
    data: TData;
};
export declare function useFallbackQuery<TData = unknown, TError = unknown, TQueryKey extends QueryKey = QueryKey>(queryKey: TQueryKey, queryFn: QueryFunction<TData, TQueryKey>, fallback: FallbackFunction<TData, TError>, options?: UseQueryOptions<TData, TError, TData, TQueryKey>): UseFallbackQueryResult<TData, TError>;
export {};
