//
//  loginMutation.ts
//  echoppe
//
//  Created by d-exclaimation on 22:03.
//
import { __endpoint__, __version__ } from "./../constants/index";
import { LoginConfirmation, UserCredentials } from "./../model/User";

export const loginMutation = async (body: UserCredentials) => {
  try {
    const resp = await fetch(`${__endpoint__}/${__version__}/auth/signin`, {
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
