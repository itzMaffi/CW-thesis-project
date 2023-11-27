import DailyCurriculum from "./components/curriculum/DailyCurriculumDashboardComponent";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import LectureComponent from "./components/curriculum/LectureComponent";

function App() {
  return (
  <>
    <h1 className="text-red-500">HELLO AGENDA</h1>
    <BrowserRouter>
      <Routes>
       <Route path="/" element={<DailyCurriculum></DailyCurriculum>} />
       <Route path="/lecture/:lectureId" element={<LectureComponent></LectureComponent>} />
      </Routes>
    </BrowserRouter>
  </>
  );
}

export default App;
