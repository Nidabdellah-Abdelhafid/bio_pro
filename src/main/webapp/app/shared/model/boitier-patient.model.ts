import dayjs from 'dayjs';
import { IBoitier } from 'app/shared/model/boitier.model';
import { IPatient } from 'app/shared/model/patient.model';

export interface IBoitierPatient {
  id?: number;
  dateDebut?: string | null;
  dateFin?: string | null;
  boitiers?: IBoitier | null;
  patients?: IPatient | null;
}

export const defaultValue: Readonly<IBoitierPatient> = {};
