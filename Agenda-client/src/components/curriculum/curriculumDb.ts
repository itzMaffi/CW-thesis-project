import Curriculum from './Curriculum';
import CurriculumData from './testData.json';

export function getCurriculumOfTheDay(day:number):Curriculum {
  return CurriculumData[day];
}