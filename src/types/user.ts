export type TUserType = "aluno" | "funcionario" | "professor";

export interface IUser {
  id: string;
  avatar?: string;
  email: string;
  name: string;
  cpf?: string;
  type?: TUserType;

  [key: string]: any;
}
