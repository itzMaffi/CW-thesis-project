import Dashboard from './components/Dashboard/Dashboard';
import LectureComponent from './components/curriculum/LectureComponent';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SyllabusPage from './components/curriculum/SyllabusPage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route
            path="/lecture/:lectureId"
            element={<LectureComponent></LectureComponent>}
          />
          <Route path='/syllabus' element={<SyllabusPage></SyllabusPage>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
