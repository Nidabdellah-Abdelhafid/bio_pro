import { IBoitier } from 'app/shared/model/boitier.model';
import { ICapteur } from 'app/shared/model/capteur.model';

export interface IBoitierCapteur {
  id?: number;
  branche?: string | null;
  etat?: boolean | null;
  boitiers?: IBoitier | null;
  capteurs?: ICapteur | null;
}

export const defaultValue: Readonly<IBoitierCapteur> = {
  etat: false,
};
