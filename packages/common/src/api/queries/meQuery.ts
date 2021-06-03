//
//  meQuery.ts
//  echoppe
//
//  Created by d-exclaimation on 21:56.
//

import { __endpoint__, __version__ } from "../../constants";
import { User } from "../../model/User";

/** `GET` request for validating user session */
export const meQuery = async () => {
  const resp = await fetch(`${__endpoint__}/${__version__}/auth/me`, {
    method: "GET",
    credentials: "include",
  });
  const user: User = await resp.json();
  return user;
};
