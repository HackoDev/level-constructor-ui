import { IUser } from "./users";

export interface IAuthObject {
  is_authenticated: boolean;
  user: IUser
}

export interface IAuthCredentials {
  login: string;
  password: string;
}
