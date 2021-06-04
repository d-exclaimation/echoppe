import { SignUpCredentials } from "../../model/User";
/** SignUp `POST` request takes paramerter of UserCredentials */
export declare const signUpMutation: (body: SignUpCredentials) => Promise<import("../../model/User").User>;
