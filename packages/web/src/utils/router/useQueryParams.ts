//
//  useQueryParams.ts
//  echoppe
//
//  Created by d-exclaimation on 17:28.
//

import { useLocation } from "react-router-dom";

export const useQueryParam = (key: string) => {
  const location = useLocation();
  try {
    return new URLSearchParams(location.search).get(key);
  } catch (_) {
    return null;
  }
};

export const useQueryParams = (...keys: string[]) => {
  const location = useLocation();
  try {
    const search = new URLSearchParams(location.search);
    return keys.map((key) => search.get(key));
  } catch (_) {
    return keys.map(() => null);
  }
};
