/**
 * Echoppe User info
 * - id
 * - Email address
 * - Name
 * - Username
 */
export type User = {
  email: string;
  id: string;
  name: string;
  username: string;
};

/**
 * Echoppe User Credentials for Login
 */
export type UserCredentials = {
  login: {
    email: string;
    password: string;
  };
};

/**
 * Echoppe Login Confirmation
 */
export type LoginConfirmation = {
  user: User;
};
