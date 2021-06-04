/**
 * Echoppe User info
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
 * Echoppe Initial Credentials for Signing Up
 */
export type SignUpCredentials = {
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
export type LoginConfirmation = {
  user: User;
};
