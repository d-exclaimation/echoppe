//
//  useFallbackQuery.ts
//  echoppe
//
//  Created by d-exclaimation on 20:00.
//
import {
  QueryFunction,
  QueryKey,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "react-query";

/// Fallback function when getting an error, takes the error thrown and failed data
type FallbackFunction<TData, TError> = (given: {
  error: TError | null;
  data: TData | undefined;
}) => TData;

/// Abstraction on top UseQueryResult with no error and non-undefined data
type UseFallbackQueryResult<TData, TError> = Omit<
  Omit<UseQueryResult<TData, TError>, "error">,
  "data"
> & { data: TData };

/// useQuery but with a fallback for failure on data, rather than catching on error
export function useFallbackQuery<
  TData = unknown,
  TError = unknown,
  TQueryKey extends QueryKey = QueryKey
>(
  queryKey: TQueryKey,
  queryFn: QueryFunction<TData, TQueryKey>,
  fallback: FallbackFunction<TData, TError>,
  options?: UseQueryOptions<TData, TError, TData, TQueryKey>
): UseFallbackQueryResult<TData, TError> {
  const result = useQuery(queryKey, queryFn, options);

  if (result.isError)
    return {
      ...result,
      data: fallback({ data: result.data, error: result.error }),
    };

  if (typeof result.data === "undefined")
    return {
      ...result,
      data: fallback({ data: result.data, error: result.error }),
    };

  return {
    ...result,
    data: result.data,
  };
}
