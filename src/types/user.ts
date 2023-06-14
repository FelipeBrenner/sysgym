export type TUserType = "aluno" | "funcionario" | "professor";

export type TTypeOptions = {
  label: string;
  value: TUserType;
};

export const typeOptions: TTypeOptions[] = [
  {
    label: "Aluno",
    value: "aluno",
  },
  {
    label: "Professor",
    value: "professor",
  },
  {
    label: "Funcionário",
    value: "funcionario",
  },
];

export interface IUser {
  id: string;
  avatar?: string;
  email: string;
  name: string;
  cpf?: string;
  type?: TUserType;

  [key: string]: any;
}
