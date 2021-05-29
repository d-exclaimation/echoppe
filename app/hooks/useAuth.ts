import { useCallback, useEffect, useState } from "react";
import { loginMutation } from "./../api/loginMutation";
import { meQuery } from "./../api/meQuery";
import { User } from "./../model/User";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);

  const authenticate = useCallback(
    (email: string, password: string) => {
      loginMutation({ login: { email, password } })
        .then((user) => setUser(user))
        .catch(console.error);
    },
    [setUser]
  );

  const validateAuth = useCallback(() => {
    meQuery()
      .then((user) => setUser(user))
      .catch((e) => console.log(e));
  }, [setUser]);

  useEffect(() => {
    validateAuth();
  }, []);

  const logOut = useCallback(() => setUser(null), [setUser]);

  return { user, authenticate, validateAuth, logOut };
}
