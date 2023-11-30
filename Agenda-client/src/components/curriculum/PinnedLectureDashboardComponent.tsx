import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Lecture from './interfaces/Lecture';
import curriculumDB from './data/curriculumDb';

export default function PinnedLectureDashboardComponent({
  layoutKey,
}: {
  layoutKey: string;
}) {
  const [lecture, setLecture] = useState<Lecture>();

  useEffect(() => {
    (async () => {
      const result = await curriculumDB.getLectureByLayoutId(layoutKey);
      setLecture(result);
    })();
  }, []);

  return (
    lecture && (
      <div className="h-full w-full p-2">
          <h3 className=' text-cw-orange font-bold text-xl mb-2'>{lecture.name}</h3>
        <p className='text-gray-700'>{lecture.summary}</p>
        <Link className="absolute bottom-0 right-0" to={'Lecture/' + lecture.id}>
          <p className='bg-cw-orange px-2 py-1 rounded-tl-xl text-white font-semibold'>Go to lecture</p>
        </Link>
      </div>
    )
  );
}
