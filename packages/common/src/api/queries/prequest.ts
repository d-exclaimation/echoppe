//
//  prequest.ts
//  echoppe
//
//  Created by d-exclaimation on 13:47.
//

import { __endpoint__, __version__ } from "../../constants";

/**
 * Make a get request to fetch the prequest one-time-token
 * @returns boolean sign that the prequest was made
 */
export const prequest = async () => {
  const resp = await fetch(
    `${__endpoint__}/${__version__}/auth/csrf-prequest`,
    {
      method: "GET",
      credentials: "include",
    }
  );
  return resp.ok;
};
