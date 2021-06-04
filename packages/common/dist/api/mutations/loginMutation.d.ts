import { UserCredentials } from "../../model/User";
/** SignIn `POST` request takes paramerter of UserCredentials */
export declare const loginMutation: (body: UserCredentials) => Promise<import("../../model/User").User>;
