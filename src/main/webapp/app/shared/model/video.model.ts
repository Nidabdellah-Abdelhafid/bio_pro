import dayjs from 'dayjs';
import { IPatient } from 'app/shared/model/patient.model';

export interface IVideo {
  id?: number;
  nom?: string | null;
  url?: string | null;
  date?: string | null;
  duree?: number | null;
  patients?: IPatient | null;
}

export const defaultValue: Readonly<IVideo> = {};
