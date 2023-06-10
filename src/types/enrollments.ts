export interface IEnrollment {
  id: string;
  date?: string | null;
  plan?: string;
  observation?: string;

  [key: string]: any;
}
