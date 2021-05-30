//
//  loginMutation.ts
//  echoppe
//
//  Created by d-exclaimation on 22:03.
//
import { LoginConfirmation, UserCredentials } from "./../model/User";

export const loginMutation = async (body: UserCredentials) => {
  try {
    const resp = await fetch("http://localhost:4000/v1-imposter/auth/signin", {
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
  } catch (e) {
    return null;
  }
};
