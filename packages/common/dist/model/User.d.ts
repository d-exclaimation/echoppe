export declare type User = {
    email: string;
    id: string;
    name: string;
    username: string;
};
export declare type UserCredentials = {
    login: {
        email: string;
        password: string;
    };
};
export declare type LoginConfirmation = {
    user: User;
};
