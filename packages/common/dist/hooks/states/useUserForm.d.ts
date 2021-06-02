/// <reference types="react" />
declare type UserFormValue = {
    email: string;
    pass: string;
    isShown: boolean;
};
declare type UserFormActions = {
    updateEmail: FormChange;
    updatePass: FormChange;
    toggler: TogglePassword;
};
export declare type FormChange = (e: React.ChangeEvent<HTMLInputElement>) => void;
declare type TogglePassword = () => void;
export declare function useUserForm(): [UserFormValue, UserFormActions];
export {};
