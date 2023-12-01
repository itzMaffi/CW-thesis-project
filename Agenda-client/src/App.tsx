import Dashboard from './components/Dashboard/Dashboard';
import LectureComponent from './components/curriculum/LectureComponent';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SyllabusPage from './components/curriculum/SyllabusPage';
import { Navbar } from './components/Navbar/Navbar';
import { LogIn } from './components/LoginPage/LogIn';
import Token from './components/Token/Token';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<LogIn />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/token/:token" element={<Token />} />
          <Route
            path="/lecture/:lectureId"
            element={<LectureComponent></LectureComponent>}
          />
          <Route path="/syllabus" element={<SyllabusPage></SyllabusPage>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
