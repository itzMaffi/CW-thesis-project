import { useState, useEffect } from 'react';
import curriculumDb from './data/curriculumDb';
import { Link } from 'react-router-dom';
import Curriculum from './interfaces/Curriculum';
import layoutDb from '../../utils/layoutsDB';
import { Widget, WidgetType } from '../../utils/Widget';

export default function DailyCurriculum() {
  const [day, setDay] = useState(0);
  const [dailyCurriculum, setDailyCurriculum] = useState<Curriculum>();

  useEffect(() => {
    (async () => {
      const dailyCurriculum = await curriculumDb.getCurriculumOfTheDay(day);

      setDailyCurriculum(dailyCurriculum);
    })();
  }, [day]);

  async function onPin() {
    const widget:Widget = new Widget(WidgetType.pinnedLecture);
    await curriculumDb.pinLectureBy(dailyCurriculum!.lecture_id, widget.i);
    
    await layoutDb.saveWidget(widget);
  }

  return (
    dailyCurriculum && (
      <div className="w-full h-full">
        <button onClick={() => setDay(day + 1)}>change day</button>
        <h2>Todays Curriculum</h2>
        {dailyCurriculum.toy_problem_name && (
          <p>Toy Problem: {dailyCurriculum.toy_problem_name}</p>
        )}
        <p>
          Lecture:{' '}
          <Link to={'Lecture/' + dailyCurriculum.lecture_id}>
            {dailyCurriculum.lecture_name}
          </Link>
        </p>
        <button
          onClick={onPin}
          className="bg-blue-700 rounded-sm text-white p-1.5 self-end w-1/6"
        >
          pin lecture
        </button>
        <p>Exercise: {dailyCurriculum.exercise_name}</p>
      </div>
    )
  );
}
