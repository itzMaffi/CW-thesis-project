import Dashboard from './components/Dashboard/Dashboard';
import LectureComponent from './components/LecturePage/LectureComponent';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SyllabusPage from './components/curriculum/SyllabusPage';
import { Navbar } from './components/Navbar/Navbar';
import { LogIn } from './components/LoginPage/LogIn';
import Token from './components/Token/Token';
import { ReactNode, useState } from 'react';
import { LectureProvider } from './context/LectureContext';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <LectureProvider>
          <Routes>
            <Route
              path="/"
              element={<LogIn setIsAuthenticated={setIsAuthenticated} />}
            />
            <Route path="/token/:token" element={<Token />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/lecture/:lectureId"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <LectureComponent />
                </ProtectedRoute>
              }
            />
            <Route
              path="/syllabus"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <SyllabusPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </LectureProvider>
      </BrowserRouter>
    </>
  );
}

function ProtectedRoute({
  isAuthenticated,
  children,
}: {
  isAuthenticated: boolean;
  children: ReactNode;
}) {
  if (!isAuthenticated) return <Navigate to="/" replace></Navigate>;
  return children;
}

export default App;
