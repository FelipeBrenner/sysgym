export interface IEnrollment {
  cpf: string;
  date?: string | null;
  plan?: string;
  observation?: string;

  [key: string]: any;
}
