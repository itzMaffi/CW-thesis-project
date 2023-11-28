import Curriculum from '../interfaces/Curriculum';
import Lecture from '../interfaces/Lecture';
import CurriculumData from './testData.json';

export class CurriculumDB {
  private static instance?: CurriculumDB;
  private constructor() {}

  pinnedLectures: Set<Lecture> = new Set<Lecture>();

  public static GetInstance(): CurriculumDB {
    if (!CurriculumDB.instance) CurriculumDB.instance = new CurriculumDB();

    return CurriculumDB.instance;
  }

  async getCurriculumOfTheDay(day: number): Promise<Curriculum> {
    return CurriculumData.curriculum[day];
  }

  async getLectureBy(id: number): Promise<Lecture> {
    const lecture = CurriculumData.lectures.find((el) => el.id == id);
    if (!lecture) throw new Error('lecture does not exist');

    return lecture;
  }

  async pinLecture(lecture: Lecture) {
    if (lecture) this.pinnedLectures.add(lecture);
  }

  async pinLectureBy(id: number) {
    if (id) {
      const lecture = await this.getLectureBy(id);
      this.pinLecture(lecture);
    }
  }

  async getPinnedLectures(): Promise<Lecture[]> {
    return Array.from(this.pinnedLectures);
  }
}

export default CurriculumDB.GetInstance();
