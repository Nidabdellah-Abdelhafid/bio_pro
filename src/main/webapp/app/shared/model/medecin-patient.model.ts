import dayjs from 'dayjs';
import { IMedecin } from 'app/shared/model/medecin.model';
import { IPatient } from 'app/shared/model/patient.model';

export interface IMedecinPatient {
  id?: number;
  dateDebut?: string | null;
  dateFin?: string | null;
  medecins?: IMedecin | null;
  patients?: IPatient | null;
}

export const defaultValue: Readonly<IMedecinPatient> = {};
