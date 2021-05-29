export type User = {
  email: string;
  id: string;
  name: string;
  username: string;
};

export type UserCredentials = {
  login: {
    email: string;
    password: string;
  };
};

export type LoginConfirmation = {
  user: User;
};
