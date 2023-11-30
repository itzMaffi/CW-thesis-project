import { useState, useEffect } from 'react';
import curriculumDb from './data/curriculumDb';
import { Link } from 'react-router-dom';
import ICurriculum from './interfaces/Curriculum';
import { schedule } from './data/curriculumDb';
import LecturePin from './LecturePin';

export default function SyllabusPage() {
  const [curriculum, setCurriculum] = useState<ICurriculum[]>([]);

  useEffect(() => {
    (async () => {
      const curriculum = await curriculumDb.getCurriculum();
      console.log(curriculum);
      setCurriculum(curriculum);
    })();
  }, []);

  return (
    <>
      <h2>Syllabus</h2>

      {curriculum.map((el) => (
        <details key={el.id}>
          <summary>{schedule.curriculumDayMap[el.id]}</summary>
          {el.toy_problem_name && <p>Toy Problem: {el.toy_problem_name}</p>}
          <p>
            Lecture:{' '}
            <Link to={'Lecture/' + el.lecture_id}>{el.lecture_name}</Link>
          </p>
          <LecturePin lectureId={el.lecture_id} />
          <p>Exercise: {el.exercise_name}</p>
        </details>
      ))}
    </>
  );
}
