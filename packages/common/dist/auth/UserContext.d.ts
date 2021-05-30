/// <reference types="react" />
import { User } from "./../model/User";
export declare type UserContext = {
    type: "logged-in";
    user: User;
} | {
    type: "logged-out";
    authenticate: (email: string, password: string) => void;
};
export declare const AuthContext: import("react").Context<UserContext>;
