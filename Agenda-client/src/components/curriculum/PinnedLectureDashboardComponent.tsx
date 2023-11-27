import { Link } from 'react-router-dom';
import Lecture from './interfaces/Lecture';

export default function PinnedLectureDashboardComponent({lecture}:{lecture:Lecture}) {
  
  return (
    <Link to={"Lecture/"+lecture.id}>
      <div className='rounded-md border border-orange-400 divide-dashed w-96 '>
        <h2>Pinned Lecture</h2>
        <h3>{lecture.name}</h3>
        <p>Description:</p>
        <p>short lecture summary</p>
      </div>
    </Link>
    
  );
}