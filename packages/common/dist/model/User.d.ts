/**
 * Echoppe User info
 */
export declare type User = {
    email: string;
    id: string;
    name: string;
    username: string;
};
/**
 * Echoppe User Credentials for Login
 */
export declare type UserCredentials = {
    login: {
        email: string;
        password: string;
    };
};
/**
 * Echoppe Initial Credentials for Signing Up
 */
export declare type SignUpCredentials = {
    user: {
        name: string;
        username: string;
        email: string;
        password: string;
    };
};
/**
 * Echoppe Login Confirmation
 */
export declare type LoginConfirmation = {
    user: User;
};
