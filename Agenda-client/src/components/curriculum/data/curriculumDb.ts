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

  getCurriculumOfTheDay(day: number): Curriculum {
    return CurriculumData.curriculum[day];
  }

  getLectureBy(id: number): Lecture {
    const lecture = CurriculumData.lectures.find((el) => el.id == id);
    if (!lecture) throw new Error('lecture does not exist');

    return lecture;
  }

  pinLecture(lecture: Lecture) {
    if (lecture) this.pinnedLectures.add(lecture);
  }

  pinLectureBy(id: number) {
    if (id)
    {
      const lecture = this.getLectureBy(id);
      this.pinLecture(lecture);
    } 
  }

  getPinnedLectures():Lecture[]
  {
    return Array.from(this.pinnedLectures);
  }
}

export default CurriculumDB.GetInstance();
