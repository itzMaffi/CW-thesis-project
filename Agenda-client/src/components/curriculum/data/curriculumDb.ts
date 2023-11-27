import Curriculum from '../interfaces/Curriculum';
import Lecture from '../interfaces/Lecture';
import CurriculumData from './testData.json';

export function getCurriculumOfTheDay(day:number):Curriculum {
  return CurriculumData.curriculum[day];
}

export function getLectureBy(id:number):Lecture {
  const lecture = CurriculumData.lectures.find((el)=> el.id == id);
  if(!lecture)
    throw new Error("lecture does not exist");

  return lecture; 
}