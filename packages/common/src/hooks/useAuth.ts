import { useCallback, useEffect, useState } from "react";
import { loginMutation } from "./../api/loginMutation";
import { meQuery } from "./../api/meQuery";
import { User } from "./../model/User";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setLoading] = useState(true);

  const authenticate = useCallback(
    (email: string, password: string) => {
      setLoading(true);
      loginMutation({ login: { email, password } })
        .then((user) => {
          setUser(user);
          setLoading(true);
        })
        .catch(console.error);
    },
    [setUser, setLoading]
  );

  const validateAuth = useCallback(() => {
    setLoading(true);
    meQuery()
      .then((user) => {
        setUser(user);
        setLoading(false);
      })
      .catch((e) => console.log(e));
  }, [setUser, setLoading]);

  useEffect(() => {
    validateAuth();
  }, []);

  const logOut = useCallback(() => setUser(null), [setUser]);

  return { user, isLoading, authenticate, validateAuth, logOut };
}
