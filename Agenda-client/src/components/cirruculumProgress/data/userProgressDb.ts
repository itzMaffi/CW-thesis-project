import { IUser } from '../../../utils/types';
import UserProgressData from './userProgressData.json';

const TotalDays = 6;

export class UserProgressDB {
  private static instance?: UserProgressDB;
  private constructor() {}
  private _user?: IUser;

  async getUserProgress() {

    return Math.floor(
      ((UserProgressData.find((el) => el.userId == this._user?.id)?.day ?? 0) * 100) /
        TotalDays
    );
  }

  async getUserCurrentDay() {
    return UserProgressData.find((el) => el.userId == this._user?.id)?.day ?? 0;
  }

  public static GetInstance(): UserProgressDB {
    if (!UserProgressDB.instance)
      UserProgressDB.instance = new UserProgressDB();

    return UserProgressDB.instance;
  }
  set user(user: IUser) {
    this._user = user;
  }

  get id() {
    return this._user?.id ?? '';
  }

  get user() : IUser {
    return this._user!!;
  }
}
