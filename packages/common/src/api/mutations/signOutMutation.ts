//
//  signoutMutation.ts
//  echoppe
//
//  Created by d-exclaimation on 22:17.
//
import { __endpoint__, __version__ } from "../../constants/index";

/** Signout `POST` request to remove user session */
export const signOutMutation = async () => {
  const resp = await fetch(`${__endpoint__}/${__version__}/auth/signout`, {
    method: "POST",
    credentials: "include",
    redirect: "follow",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return resp.ok;
};
