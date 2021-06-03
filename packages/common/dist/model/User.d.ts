/**
 * Echoppe User info
 * - id
 * - Email address
 * - Name
 * - Username
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
 * Echoppe Login Confirmation
 */
export declare type LoginConfirmation = {
    user: User;
};
