import ICurriculum from '../interfaces/Curriculum';
import ILecture from '../interfaces/Lecture';
import ISchedule from '../interfaces/Schedule';
import CurriculumData from './testData.json';

export const schedule: ISchedule = {
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
  [key: string]: ILecture;
};

export class CurriculumDB {
  private static instance?: CurriculumDB;
  private constructor() {}

  layoutLectureMap: LayoutLecture = {};
  pinnedLectures: Set<number> = new Set<number>();

  public static GetInstance(): CurriculumDB {
    if (!CurriculumDB.instance) CurriculumDB.instance = new CurriculumDB();

    return CurriculumDB.instance;
  }

  async getCurriculumOfTheDay(day: number): Promise<ICurriculum> {
    return CurriculumData.curriculum[day];
  }

  async getCurriculum(): Promise<ICurriculum[]> {
    return CurriculumData.curriculum;
  }

  async getLectureBy(id: number): Promise<ILecture> {
    const lecture = CurriculumData.lectures.find((el) => el.id == id);
    if (!lecture) throw new Error('lecture does not exist');

    return lecture;
  }

  async pinLecture(lecture: ILecture, layoutId: string = '') {
    if (lecture) {
      this.layoutLectureMap[layoutId] = lecture;
      this.pinnedLectures.add(lecture.id);
    }
  }

  async pinLectureBy(id: number, layoutId: string) {
    const lecture = await this.getLectureBy(id);
    this.pinLecture(lecture, layoutId);
  }

  async unPinLecture(id: number, widgetId: string) {
    this.pinnedLectures.delete(id);
    delete this.layoutLectureMap[widgetId];
  }

  async getWidgetIdByLecture(id: number) {
    return Object.entries(this.layoutLectureMap).find(
      ([_, lecture]) => lecture.id == id
    )?.[0];
  }

  async getPinnedLectures(): Promise<LayoutLecture> {
    return this.layoutLectureMap;
  }

  async getLectureByLayoutId(layoutId: string): Promise<ILecture> {
    return this.layoutLectureMap[layoutId];
  }

  async isLecturePinned(lectureId: number) {
    return this.pinnedLectures.has(lectureId);
  }
}

export default CurriculumDB.GetInstance();
