import curriculumDb from './data/curriculumDb';
import DailyCurriculum from './DailyCurriculumDashboardComponent';
import PinnedLectureDashboardComponent from './PinnedLectureDashboardComponent';

export default function TempDashboard() {

  const pinnedLectures = curriculumDb.getPinnedLectures();

  return (
    <>
    <div className='flex align-center justify-center w-screen h-screen'>
      <DailyCurriculum />
      {pinnedLectures.map(lecture=> <PinnedLectureDashboardComponent key={lecture.id} lecture={lecture}></PinnedLectureDashboardComponent>)}
    </div>
    
    </>
  );
}