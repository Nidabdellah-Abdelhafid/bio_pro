import dayjs from 'dayjs';
import { IUser } from 'app/shared/model/user.model';

export interface IExtraUser {
  id?: number;
  cin?: string | null;
  numeroTelephone?: number | null;
  dateNaissance?: string | null;
  nationalite?: string | null;
  adresse?: string | null;
  genre?: string | null;
  user?: IUser | null;
}

export const defaultValue: Readonly<IExtraUser> = {};
