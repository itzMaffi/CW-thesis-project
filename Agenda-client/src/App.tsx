import Dashboard from './components/Dashboard/Dashboard';
import LectureComponent from './components/curriculum/LectureComponent';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SyllabusPage from './components/curriculum/SyllabusPage';
import { Navbar } from './components/Navbar/Navbar';
import { Login } from './components/LoginPage/Login';
import googleButton from './assets/google_signin_assets/web//svg/dark/web_dark_rd_SI.svg';

// OAuth
function navigate(url: string) {
  window.location.href = url;
}

// TODO change this to BE url
async function auth() {
  const response = await fetch('http://127.0.0.1:3000/request', {
    method: 'post',
  });

  const data = await response.json();
  console.log('data from App.tsx:', data);
  navigate(data.url);
}

function App() {
  return (
    <>
      {/* TODO implement the proper frontend */}
      <h3>Google OAuth</h3>
      <button className="btn-auth" type="button" onClick={() => auth()}>
        <img className="btn-auth-img" src={googleButton} alt="google sign in" />
      </button>

      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
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
