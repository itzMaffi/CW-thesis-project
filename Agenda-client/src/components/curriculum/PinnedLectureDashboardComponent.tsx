import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ILecture from './interfaces/Lecture';
import curriculumDB from './data/curriculumDb';
import { Widget } from '../../utils/Widget';
import GenericPin from './GenericPin';

export default function PinnedLectureDashboardComponent({
  widget,
}: {
  widget: Widget;
}) {
  const [lecture, setLecture] = useState<ILecture>();

  useEffect(() => {
    (async () => {
      const result = await curriculumDB.getLectureBy(+widget.dataId!);
      setLecture(result);
    })();
  }, []);

  return (
    lecture && (
      <div className="h-full w-full p-2">
        <div className="float-right text-cw-orange font-bold text-xl mb-2">
          <GenericPin widget={widget}></GenericPin>
        </div>
        <h3 className=" text-cw-orange font-bold text-xl mb-2">
          {lecture.name}
        </h3>
        <p className="text-gray-700">{lecture.summary}</p>
        <Link
          className="absolute bottom-0 right-0"
          to={'Lecture/' + lecture.id}
        >
          <p className="bg-cw-orange px-2 py-1 rounded-tl-xl text-white font-semibold">
            Go to lecture
          </p>
        </Link>
      </div>
    )
  );
}
