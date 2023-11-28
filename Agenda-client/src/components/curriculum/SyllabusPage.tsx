import { useState, useEffect } from 'react';
import curriculumDb from './data/curriculumDb';
import { Link } from 'react-router-dom';
import Curriculum from './interfaces/Curriculum';
import { schedule } from './data/curriculumDb';
import { Widget, WidgetType } from '../../utils/Widget';
import layoutDb from '../../utils/layoutsDB';

export default function SyllabusPage() {
  const [curriculum, setCurriculum] = useState<Curriculum[]>([]);

  useEffect(() => {
    (async () => {
      const curriculum = await curriculumDb.getCurriculum();
      console.log(curriculum)
      setCurriculum(curriculum);
    })();
  }, []);

  async function onPin(lectureId: number) {
    const widget:Widget = new Widget(WidgetType.pinnedLecture);
    await curriculumDb.pinLectureBy(lectureId, widget.i);
    
    await layoutDb.saveWidget(widget);
  }

  console.log('tests: ' + curriculum )

  return (
    <>
      <h2>Syllabus</h2>

      {
        curriculum.map((el) => (
          <details key={el.id}>
            <summary>{schedule.curriculumDayMap[el.id]}</summary>
            {el.toy_problem_name && <p>Toy Problem: {el.toy_problem_name}</p>}
            <p>
              Lecture:{' '}
              <Link to={'Lecture/' + el.lecture_id}>{el.lecture_name}</Link>
            </p>
            <button
              onClick={() => onPin(el.lecture_id)}
              className="bg-blue-700 rounded-sm text-white p-1.5 self-end w-1/6"
            >
              pin lecture
            </button>
            <p>Exercise: {el.exercise_name}</p>
          </details>
        ))
        }
    </>
  );
}
