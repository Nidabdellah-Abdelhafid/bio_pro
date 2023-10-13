import { IExtraUser } from 'app/shared/model/extra-user.model';
import { IMedecinPatient } from 'app/shared/model/medecin-patient.model';

export interface IMedecin {
  id?: number;
  specialite?: string | null;
  extraUserId?: IExtraUser | null;
  medecinPatients?: IMedecinPatient[] | null;
}

export const defaultValue: Readonly<IMedecin> = {};
