/// <reference types="react" />
/**
 * User Form States
 */
declare type UserFormValue = {
    email: string;
    pass: string;
    isShown: boolean;
};
/**
 * User Form State Dispacters
 */
declare type UserFormActions = {
    updateEmail: FormChange;
    updatePass: FormChange;
    toggler: TogglePassword;
};
/**
 * Form dispatcher function
 */
export declare type FormChange = (e: React.ChangeEvent<HTMLInputElement>) => void;
/**
 * Toggler for isShown field
 */
declare type TogglePassword = () => void;
/**
 * useUserForm is a react hook for handling common usage for user login / signup forms
 *
 * This hooks will returns states coupled as an object, so it can destructured,
 * and all the dispatchers as one object for the same reason
 * @returns all the states and dispacters seperated as tuples
 */
export declare function useUserForm(): [UserFormValue, UserFormActions];
export {};
