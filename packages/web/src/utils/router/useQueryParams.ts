//
//  useQueryParams.ts
//  echoppe
//
//  Created by d-exclaimation on 17:28.
//

import { useLocation } from "react-router-dom";

export const useQueryParams = (key: string) => {
  const location = useLocation();
  try {
    return new URLSearchParams(location.search).get(key);
  } catch (_) {
    return null;
  }
};
