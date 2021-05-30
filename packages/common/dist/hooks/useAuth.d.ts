import { User } from "./../model/User";
export declare function useAuth(): {
    user: User | null;
    isLoading: boolean;
    authenticate: (email: string, password: string) => void;
    validateAuth: () => void;
    logOut: () => void;
};
