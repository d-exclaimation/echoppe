import { UserCredentials } from "../../model/User";
/** login `POST` request takes paramerter of UserCredentials */
export declare const loginMutation: (body: UserCredentials) => Promise<import("../../model/User").User>;
