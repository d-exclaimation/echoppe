/// <reference types="react" />
import { User } from "../../model/User";
/** Authentication Context Blueprint */
export declare type UserContext = {
    isLoading: boolean;
    isLoggedIn: boolean;
    user: User | null;
};
export declare const AuthContext: import("react").Context<UserContext>;
