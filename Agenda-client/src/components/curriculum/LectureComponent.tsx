import { Params, useParams } from 'react-router-dom';
import Lecture from './interfaces/Lecture';
import * as curriculumDb from './data/curriculumDb';

export default function LectureComponent() {
  const {lectureId} : Readonly<Params<string>> = useParams()
  const lecture:Lecture = curriculumDb.getLectureBy(+(lectureId ?? 1))
  return (
    <>
    <div className='flex align-center justify-center w-full'>
    {lecture && 
      <div className='rounded-md border border-orange-400 divide-dashed w-3/5 h-screen'>
        <h2>{lecture.name}</h2>
        <h3>Code examples:</h3>
        <p>{lecture.codeExamples}</p>
        <h3>Extra Resources:</h3>
        <p>{lecture.extraResources}</p>
        <h3>Summary:</h3>
        <li>{lecture.summary}</li>
      </div>
      
      }
      {!lecture && <h3>lecture does not exist</h3>}
    </div>
    
    </>
    
  );
}