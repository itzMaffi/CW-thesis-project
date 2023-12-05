import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ILecture from '../curriculum/interfaces/Lecture';
import curriculumDB from '../curriculum/data/curriculumDb';
import { Widget } from '../widget/Widget';
import GenericPin from '../widget/GenericPin';

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
        <div className="float-right text-cp-blue font-bold text-xl mb-2">
          <GenericPin widget={widget}></GenericPin>
        </div>
        <h3 className=" text-cp-dark-blue font-bold text-xl mb-2">
          {lecture.name}
        </h3>
        <p className="text-cp-dark-blue">{lecture.summary}</p>
        <Link
          className="absolute bottom-1 right-1"
          to={'Lecture/' + lecture.id}
        >
          <p className="bg-cp-blue hover:bg-cp-middle-blue shadow-md px-2 py-1 rounded  text-white font-semibold">
            Go to lecture
          </p>
        </Link>
      </div>
    )
  );
}
