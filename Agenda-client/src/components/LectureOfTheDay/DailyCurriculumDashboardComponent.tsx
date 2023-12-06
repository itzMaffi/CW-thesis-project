import { useState, useEffect } from 'react';
import curriculumDb from '../curriculum/data/curriculumDb';
import { Link } from 'react-router-dom';
import ICurriculum from '../curriculum/interfaces/Curriculum';
import { Widget, WidgetType } from '../widget/Widget';
import WidgetHeader from '../widgetHeader/WidgetHeader';
import { useLectureContext } from '../../context/LectureContext';
import TypePin from '../widget/TypePin';
import { ImArrowLeft, ImArrowRight } from "react-icons/im";

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
              <button className="text-cp-light-blue" onClick={onPreviousDay}>
                <ImArrowLeft></ImArrowLeft>
              </button>
            )}
            <div className="ml-4 mr-4 text-center">Lecture of the day</div>
            {day < 6 && (
              <button className="text-cp-light-blue" onClick={onNextDay}>
                <ImArrowRight></ImArrowRight>
              </button>
            )}
          </div>
        </WidgetHeader>
        <div className="flex flex-1 w-full">
          <div className="grow pl-6 w-1/2 flex flex-col justify-center">
            {dailyCurriculum.toy_problem_name && (
              <div>
                <div className="text-gray-400">Code Play Challenge:</div>
                <p>{dailyCurriculum.toy_problem_name}</p>
              </div>
            )}
            <div className="text-gray-400">Lecture:</div>
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
            <div className="text-gray-400">Exercise</div>
            <p>{dailyCurriculum.exercise_name}</p>
          </div>
          <div className="grow w-1/2 flex justify-center items-center bg-gradient-to-r from-white to-cp-middle-blue">
            <div className="h-40 w-40">
              <img className="rounded-lg object-contain " src={dailyCurriculum.url}></img>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
