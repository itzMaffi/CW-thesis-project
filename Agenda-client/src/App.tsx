import Dashboard from './components/Dashboard/Dashboard';
import LectureComponent from './components/curriculum/LectureComponent';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
<<<<<<< HEAD
=======
      <h1 className="text-red-500">HELLO AGENDA</h1>
>>>>>>> ac3df35 (working progress on help request)
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
