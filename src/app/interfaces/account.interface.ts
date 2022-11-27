import { Languages } from "../enums/language.enum";


export interface UserCredentials {
  email: string;
  password: string;
}


export interface AccountRegister extends UserCredentials {
  lang?: Languages;
}


export interface AccountActivation {
  code: number;
  email: string;
}


export interface Role {
  id?: number;
  name?: string;
}


export interface User {
  id: number;
  email: string;
  username: string;
  fullName?: string;
  lang: Languages;
  logo?: string;
  roles: Role[];
  created: Date;
  updated: Date;
}


export interface SharedUser {
  id: number;
  email: string;
  username: string;
  fullName?: string;
  logo?: string;
}
