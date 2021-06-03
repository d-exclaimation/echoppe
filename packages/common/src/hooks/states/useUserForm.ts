//
//  useUserForm.ts
//  echoppe
//
//  Created by d-exclaimation on 13:28.
//

import { useCallback, useState } from "react";

/**
 * User Form States
 */
type UserFormValue = {
  email: string;
  pass: string;
  isShown: boolean;
};

/**
 * User Form State Dispacters
 */
type UserFormActions = {
  updateEmail: FormChange;
  updatePass: FormChange;
  toggler: TogglePassword;
};

/**
 * Form dispatcher function
 */
export type FormChange = (e: React.ChangeEvent<HTMLInputElement>) => void;

/**
 * Toggler for isShown field
 */
type TogglePassword = () => void;

/**
 * useUserForm is a react hook for handling common usage for user login / signup forms
 *
 * This hooks will returns states coupled as an object, so it can destructured,
 * and all the dispatchers as one object for the same reason
 * @returns all the states and dispacters seperated as tuples
 */
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
