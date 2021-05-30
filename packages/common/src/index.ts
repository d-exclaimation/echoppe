//
//  index.ts
//  echoppe
//
//  Created by d-exclaimation on 22:24.
//

export const someFunction = () => {
  console.log("hello world");
};

export * from "./api/loginMutation";
export * from "./api/meQuery";
export * from "./auth/UserContext";
export * from "./hooks/useAuth";
export * from "./model/User";
