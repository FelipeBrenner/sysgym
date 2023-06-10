export interface IEnrollment {
  id: string;
  cpf?: string;
  date?: string | null;
  plan?: string;
  observation?: string;

  [key: string]: any;
}
