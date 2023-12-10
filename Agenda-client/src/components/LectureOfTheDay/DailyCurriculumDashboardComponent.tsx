import { useState, useEffect } from 'react';
import curriculumDb from '../curriculum/data/curriculumDb';
import { Link } from 'react-router-dom';
import ICurriculum from '../curriculum/interfaces/Curriculum';
import { Widget, WidgetType } from '../widget/Widget';
import WidgetHeader from '../widgetHeader/WidgetHeader';
import { useLectureContext } from '../../context/LectureContext';
import TypePin from '../widget/TypePin';
import { ImArrowLeft, ImArrowRight } from 'react-icons/im';
import { UserProgressDB } from '../cirruculumProgress/data/userProgressDb';

export default function DailyCurriculum({ widget }: { widget: Widget }) {
  const [day, setDay] = useState(0);
  const [maxDay, setMaxDay] = useState(0);

  const [dailyCurriculum, setDailyCurriculum] = useState<ICurriculum>();
  const { setLectureName } = useLectureContext();

  useEffect(() => {
    (async () => {
      const currentUserDay =
        await UserProgressDB.GetInstance().getUserCurrentDay();
      setDay(currentUserDay);
      setMaxDay(currentUserDay);
    })();
  }, []);

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
              <button
                className="text-cp-light-blue arrow-button"
                onClick={onPreviousDay}
              >
                <ImArrowLeft></ImArrowLeft>
              </button>
            )}
            <div className="ml-4 mr-4 text-center">Lecture of the day</div>
            {day < maxDay && (
              <button
                className="text-cp-light-blue arrow-button"
                onClick={onNextDay}
              >
                <ImArrowRight></ImArrowRight>
              </button>
            )}
          </div>
        </WidgetHeader>
        <div className="flex flex-1 w-full">
          <div className="grow pl-6 w-1/2 flex flex-col justify-center ">
            {dailyCurriculum.toy_problem_name && (
              <div>
                <div className="text-cp-blue">Code Play Challenge:</div>
                <p className="text-bold text-2xl text-cp-dark-blue">
                  {dailyCurriculum.toy_problem_name}
                </p>
              </div>
            )}
            <div className="text-cp-blue">Lecture:</div>
            <p className="flex text-bold text-2xl text-cp-dark-blue">
              <Link to={'/Lecture/' + dailyCurriculum.lecture_id}>
                {dailyCurriculum.lecture_name}
              </Link>
              <TypePin
                widgetType={WidgetType.pinnedLecture}
                dataId={'' + dailyCurriculum.lecture_id}
                className="ml-4 pin-component"
              ></TypePin>
            </p>
            <div className="text-cp-blue">Exercise</div>
            <p className="text-bold text-2xl text-cp-dark-blue">
              {dailyCurriculum.exercise_name}
            </p>
          </div>
          <div className="grow w-1/2 flex justify-center items-center ">
            <div className="h-40 w-40">
              <img
                className="rounded-lg object-contain "
                src={dailyCurriculum.url}
              ></img>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
