/// <reference types="react" />
import { User } from "./../model/User";
export declare type UserContext = {
    isLoading: boolean;
    isLoggedIn: boolean;
    user: User | null | undefined;
};
export declare const AuthContext: import("react").Context<UserContext>;
