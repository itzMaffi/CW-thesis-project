import { useState, useEffect } from 'react';
import curriculumDb from '../curriculum/data/curriculumDb';
import { Link } from 'react-router-dom';
import ICurriculum from '../curriculum/interfaces/Curriculum';
import logo from '../../assets/advancedjs1.png';
import { Widget, WidgetType } from '../widget/Widget';
import WidgetHeader from '../widgetHeader/WidgetHeader';
import { useLectureContext } from '../../context/LectureContext';
import TypePin from '../widget/TypePin';

export default function DailyCurriculum({ widget }: { widget: Widget }) {
  const [day, setDay] = useState(6);
  const [dailyCurriculum, setDailyCurriculum] = useState<ICurriculum>();
  const { setLectureName } = useLectureContext();

  useEffect(() => {
    (async () => {
      const curriculum = await curriculumDb.getCurriculumOfTheDay(day);
      setDailyCurriculum(curriculum);
      setLectureName(curriculum.lecture_name); // Update the lecture name in the context
    })();
  }, [day, setLectureName]);

  function onNextDay() {
    setDay(day + 1);
  }

  function onPreviousDay() {
    setDay(day - 1);
  }

  return (
    dailyCurriculum && (
      <div className="w-full h-full flex flex-col">
        <WidgetHeader widget={widget}>
          <div className="flex justify-center">
            {day !== 0 && (
              <button className="text-cp-blue" onClick={onPreviousDay}>
                {'<'}
              </button>
            )}
            <div className="ml-4 mr-4 text-center">Lecture of the day</div>
            {day < 6 && (
              <button className="text-cp-blue" onClick={onNextDay}>
                {'>'}
              </button>
            )}
          </div>
        </WidgetHeader>
        <div className="pl-6 pr-6 pt-2 pb-4 flex flex-1 w-full">
          <div className="grow w-1/2">
            {dailyCurriculum.toy_problem_name && (
              <div>
                <h2 className="text-gray-400">Toy Problem:</h2>
                <p>{dailyCurriculum.toy_problem_name}</p>
              </div>
            )}
            <h2 className="text-gray-400">Lecture:</h2>
            <p className="flex">
              <Link to={'/Lecture/' + dailyCurriculum.lecture_id}>
                {dailyCurriculum.lecture_name}
              </Link>
              <TypePin
                widgetType={WidgetType.pinnedLecture}
                dataId={'' + dailyCurriculum.lecture_id}
                className='ml-4'
              ></TypePin>
            </p>
            <h2 className="text-gray-400">Exercise</h2>
            <p>{dailyCurriculum.exercise_name}</p>
          </div>
          <div className="grow w-1/2 flex justify-center items-center">
            <div className="h-40 w-40">
              <img className="rounded-lg object-contain " src={logo}></img>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
