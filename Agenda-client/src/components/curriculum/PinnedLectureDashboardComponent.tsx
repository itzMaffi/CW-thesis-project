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
      <Link to={'Lecture/' + lecture.id}>
        <div className="h-full w-full">
          <h2>Pinned Lecture</h2>
          <h3>{lecture.name}</h3>
          <p>Description:</p>
          <p>short lecture summary</p>
        </div>
      </Link>
    )
  );
}
