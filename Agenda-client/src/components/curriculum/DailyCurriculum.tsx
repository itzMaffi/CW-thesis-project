import { useState } from 'react';
import * as curriculumDb from './curriculumDb'

export default function DailyCurriculum() {
  const [day, setDay] = useState(0)
  const dailyCurriculum = curriculumDb.getCurriculumOfTheDay(day);
  return (
    <div className='rounded-md border border-orange-400 divide-dashed w-96 '>
      <button onClick={()=>setDay(day+1)}>change day</button>
      <h2>Todays Curriculum</h2>
      {dailyCurriculum.toy_problem_name && <p>Toy Problem: {dailyCurriculum.toy_problem_name}</p>}
      <p>Lecture: <a href={dailyCurriculum.lecture_url}>{dailyCurriculum.lecture_name}</a></p>
      <p>Exercise: {dailyCurriculum.exercise_name}</p>
    </div>
  );
}
