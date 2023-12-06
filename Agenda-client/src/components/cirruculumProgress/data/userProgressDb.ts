import UserProgressData from './userProgressData.json';

const TotalDays = 0;

export class UserProgressDB {
  private static instance?: UserProgressDB;
  private constructor() {}


  async getUserProgress(userId:string){
    return UserProgressData.find(el=>el.userId == userId)?.day ?? 0 / TotalDays;
  }

  async getUserCurrentDay(userId:string){
    return UserProgressData.find(el=>el.userId == userId)?.day ?? 0;
  }

  public static GetInstance(): UserProgressDB {
    if (!UserProgressDB.instance) UserProgressDB.instance = new UserProgressDB();

    return UserProgressDB.instance;
  }
}