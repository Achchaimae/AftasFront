import { User } from "../Core/model/User.model";

export interface UserState {
    user: User| null;
    token:string;
    error: any;
  }