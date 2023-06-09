export interface IUser {
  id: string;
  avatar?: string;
  email: string;
  name: string;

  [key: string]: any;
}
