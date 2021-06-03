import { createContext } from "react";
import { User } from "../../model/User";

/** Authentication Context Blueprint */
export type UserContext = {
  isLoading: boolean;
  isLoggedIn: boolean;
  user: User | null | undefined;
};

export const AuthContext = createContext<UserContext>({
  isLoading: false,
  isLoggedIn: false,
  user: null,
});
