//
//  useQueryParams.ts
//  echoppe
//
//  Created by d-exclaimation on 17:28.
//

import { useLocation } from "react-router-dom";

/**
 * Abstraction for getting singular query parameters from react-router-dom
 * ---
 * Example:
 * url: `https://www.google.com/chat?id=idk-any-uuid-here-lol`
 * ```ts
 * const id = useQueryParam("id");
 * // >> id = "idk-any-uuid-here-lol"
 * // >> id of type string } null
 * ```
 * ---
 * @returns string value in the parameter
 */
export function useQueryParam(key: string) {
  const location = useLocation();
  try {
    return new URLSearchParams(location.search).get(key);
  } catch (_) {
    return null;
  }
}

/**
 * Abstraction for getting multiple query parameters from react-router-dom
 * ---
 * Example:
 * url: `https://www.google.com/chat?id=idk-any-uuid-here-lol&locale=en&server=us-west`
 * ```ts
 * const [id, locale, server] = useQueryParams("id", "locale", "server");
 * // >> id = "idk-any-uuid-here-lol"
 * // >> locale = "en"
 * // >> server = "us-west"
 * ```
 * ---
 * @returns string values as arrays in the parameter
 */
export function useQueryParams(...keys: string[]) {
  const location = useLocation();
  try {
    const search = new URLSearchParams(location.search);
    return keys.map((key) => search.get(key));
  } catch (_) {
    return keys.map(() => null);
  }
}
