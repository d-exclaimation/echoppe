//
//  signUpMutation.ts
//  echoppe
//
//  Created by d-exclaimation on 20:01.
//

import { __endpoint__, __version__ } from "../../constants";
import { LoginConfirmation, SignUpCredentials } from "../../model/User";

/** SignUp `POST` request takes paramerter of UserCredentials */
export const signUpMutation = async (body: SignUpCredentials) => {
  try {
    const resp = await fetch(`${__endpoint__}/${__version__}/auth/signup`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(body),
      redirect: "follow",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { user }: LoginConfirmation = await resp.json();
    return user;
  } catch (_) {
    throw new Error("Invalid credentials");
  }
};
