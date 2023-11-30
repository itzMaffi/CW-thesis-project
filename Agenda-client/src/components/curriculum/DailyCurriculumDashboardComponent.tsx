import { useState, useEffect } from 'react';
import curriculumDb from './data/curriculumDb';
import { Link } from 'react-router-dom';
import Curriculum from './interfaces/Curriculum';
import pinLecture from './LectureService';
import { RiPushpinLine } from 'react-icons/ri';
import logo from '../../assets/advancedjs.png';

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
    await pinLecture(dailyCurriculum!.lecture_id);
  }

  return (
    dailyCurriculum && (
      <div className="w-full h-full flex flex-col">
        <h2 className="bg-cw-orange min-w-full text-center p-2 text-lg font-bold font-sans text-white rounded-tr-md rounded-tl-md">
          Lecture of the day
        </h2>
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
              <Link to={'Lecture/' + dailyCurriculum.lecture_id}>
                {dailyCurriculum.lecture_name}
              </Link>
              <RiPushpinLine
                onClick={onPin}
                className="ml-4 cursor-pointer text-cw-orange"
              />
            </p>
            <h2 className="text-gray-400">Exercise</h2>
            <p>{dailyCurriculum.exercise_name}</p>
            <button onClick={() => setDay(day + 1)} className="text-xs">
              DEBUG: change day
            </button>
          </div>
          <div className="grow w-1/2 flex justify-center items-center" >
            <div className='h-40 w-40'>
              <img className="rounded-lg object-contain " src={logo}></img>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
