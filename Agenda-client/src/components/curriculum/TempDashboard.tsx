import curriculumDb from './data/curriculumDb';
import { useState, useEffect } from 'react';
import DailyCurriculum from './DailyCurriculumDashboardComponent';
import PinnedLectureDashboardComponent from './PinnedLectureDashboardComponent';
import Lecture from './interfaces/Lecture';

export default function TempDashboard() {
  const [pinnedLectures, setPinnedLectures] = useState<Lecture[]>([]);

  useEffect(() => {
    (async () => {
      const lectures = await curriculumDb.getPinnedLectures();
      setPinnedLectures(lectures);
    })();
  }, []);

  return (
    <>
    <div className='flex align-center justify-center w-screen h-screen'>
      <DailyCurriculum />
      {pinnedLectures.map(lecture=> <PinnedLectureDashboardComponent key={lecture.id} lecture={lecture}></PinnedLectureDashboardComponent>)}
    </div>
    
    </>
  );
}
