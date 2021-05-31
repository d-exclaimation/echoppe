//
//  meQuery.ts
//  echoppe
//
//  Created by d-exclaimation on 21:56.
//

import { User } from "../model/User";

export const meQuery = async () => {
  try {
    const resp = await fetch("http://localhost:4000/v1-imposter/auth/me", {
      method: "GET",
      credentials: "include",
    });
    const user: User = await resp.json();
    return user;
  } catch (_) {
    return null;
  }
};
