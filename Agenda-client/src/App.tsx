import {BrowserRouter, Routes, Route} from 'react-router-dom';
import LectureComponent from "./components/curriculum/LectureComponent";
import TempDashboard from "./components/curriculum/TempDashboard";

function App() {
  return (
  <>
    <h1 className="text-red-500">HELLO AGENDA</h1>
    <BrowserRouter>
      <Routes>
       <Route path="/" element={<TempDashboard></TempDashboard>} />
       <Route path="/lecture/:lectureId" element={<LectureComponent></LectureComponent>} />
      </Routes>
    </BrowserRouter>
  </>
  );
}

export default App;
