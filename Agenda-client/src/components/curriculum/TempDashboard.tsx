import curriculumDb from './data/curriculumDb';
import {useState} from 'react'
import DailyCurriculum from './DailyCurriculumDashboardComponent';
import PinnedLectureDashboardComponent from './PinnedLectureDashboardComponent';

export default function TempDashboard() {

  const [pinnedLectures, setPinnedLectures] = useState(curriculumDb.getPinnedLectures());

  return (
    <>
    <div className='flex align-center justify-center w-screen h-screen'>
      <DailyCurriculum setPinnedLectures={setPinnedLectures} />
      {pinnedLectures.map(lecture=> <PinnedLectureDashboardComponent key={lecture.id} lecture={lecture}></PinnedLectureDashboardComponent>)}
    </div>
    
    </>
  );
}