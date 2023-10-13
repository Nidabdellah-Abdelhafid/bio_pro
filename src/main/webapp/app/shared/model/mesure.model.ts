import dayjs from 'dayjs';
import { IPatient } from 'app/shared/model/patient.model';

export interface IMesure {
  id?: number;
  type?: string | null;
  valeur?: number | null;
  date?: string | null;
  patient?: IPatient | null;
}

export const defaultValue: Readonly<IMesure> = {};
