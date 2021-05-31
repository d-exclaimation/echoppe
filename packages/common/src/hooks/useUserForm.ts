//
//  useUserForm.ts
//  echoppe
//
//  Created by d-exclaimation on 13:28.
//

import { useCallback, useState } from "react";

type UserFormValue = {
  email: string;
  pass: string;
  isShown: boolean;
};

type UserFormActions = {
  updateEmail: FormChange;
  updatePass: FormChange;
  toggler: TogglePassword;
};

export type FormChange = (e: React.ChangeEvent<HTMLInputElement>) => void;

type TogglePassword = () => void;

export function useUserForm(): [UserFormValue, UserFormActions] {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [isShown, setShown] = useState(false);

  const updateEmail: FormChange = useCallback(
    (e) => setEmail(e.target.value),
    [setEmail]
  );
  const updatePass: FormChange = useCallback(
    (e) => setPass(e.target.value),
    [setPass]
  );
  const toggler: TogglePassword = useCallback(
    () => setShown((prev) => !prev),
    [setShown]
  );

  return [
    { email, pass, isShown },
    { updateEmail, updatePass, toggler },
  ];
}
