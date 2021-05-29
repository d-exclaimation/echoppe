import { createContext } from "react";
import { User } from "./../model/User";

export type UserContext =
  | {
      type: "logged-in";
      user: User;
    }
  | {
      type: "logged-out";
      authenticate: (email: string, password: string) => void;
    };

export const AuthContext = createContext<UserContext>({
  type: "logged-out",
  authenticate: () => {},
});
