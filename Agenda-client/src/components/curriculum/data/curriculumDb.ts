import Curriculum from '../interfaces/Curriculum';
import Lecture from '../interfaces/Lecture';
import Schedule from '../interfaces/Schedule';
import CurriculumData from './testData.json';

export const schedule: Schedule = {
  curriculumDayMap: {
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday',
    7: 'Monday',
  },
};

export type LayoutLecture = {
  [key: string]: Lecture;
};

export class CurriculumDB {
  private static instance?: CurriculumDB;
  private constructor() {}

  pinnedLectures: LayoutLecture = {};

  public static GetInstance(): CurriculumDB {
    if (!CurriculumDB.instance) CurriculumDB.instance = new CurriculumDB();

    return CurriculumDB.instance;
  }

  async getCurriculumOfTheDay(day: number): Promise<Curriculum> {
    return CurriculumData.curriculum[day];
  }

  async getCurriculum(): Promise<Curriculum[]> {
    return CurriculumData.curriculum;
  }

  async getLectureBy(id: number): Promise<Lecture> {
    const lecture = CurriculumData.lectures.find((el) => el.id == id);
    if (!lecture) throw new Error('lecture does not exist');

    return lecture;
  }

  async pinLecture(lecture: Lecture, layoutId: string = '') {
    if (lecture) this.pinnedLectures[layoutId] = lecture;
  }

  async pinLectureBy(id: number, layoutId: string) {
    const lecture = await this.getLectureBy(id);
    this.pinLecture(lecture, layoutId);
  }

  async getPinnedLectures(): Promise<LayoutLecture> {
    return this.pinnedLectures;
  }

  async getLectureByLayoutId(layoutId: string): Promise<Lecture> {
    return this.pinnedLectures[layoutId];
  }
}

export default CurriculumDB.GetInstance();
