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

/** Fallback function when getting an error, takes the error thrown and failed data */
type FallbackFunction<TData, TError> = (given: {
  error: TError | null;
  data: TData | undefined;
}) => TData;

/** Abstraction on top UseQueryResult with no error and always defined data */
type UseFallbackQueryResult<TData, TError> = Omit<
  Omit<UseQueryResult<TData, TError>, "error">,
  "data"
> & { data: TData };

/**
 * useQuery but with a fallback for failure on data, rather than catching on error
 *
 * use `null` for optional data types as undefined is used by react-query for data is still not there
 *
 * @param fallback Function called if `queryFn` throws anything, the throwned object and the faulty data will passed as parameter
 * @returns UseQueryResult wihout the error field and with the data is always defined
 */
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
  // Setup regular useQuery, but on different failure call the fallback to get returned data
  const result = useQuery(queryKey, queryFn, options);

  // Check if error is throwned or occured
  if (result.isError)
    return {
      ...result,
      data: fallback({ data: result.data, error: result.error }),
    };

  // Check if data still is undefined
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
