import Dashboard from './components/Dashboard/Dashboard';
import LectureComponent from './components/curriculum/LectureComponent';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

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
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
