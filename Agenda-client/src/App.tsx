import Dashboard, { DashboardState } from './components/Dashboard/Dashboard';
import LectureComponent from './components/LecturePage/LectureComponent';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SyllabusPage from './components/curriculum/SyllabusPage';
import { Navbar } from './components/Navbar/Navbar';
import { LogIn } from './components/LoginPage/LogIn';
import Token from './components/Token/Token';
import { createContext, useState, ReactNode } from 'react';
import { LectureProvider } from './context/LectureContext';

interface DashboardContextType {
  dashboardState: DashboardState;
  setDashboardState: (dashboardState: DashboardState) => void;
}

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

export const DashboardContext = createContext<DashboardContextType>({
  dashboardState: { layouts: {}, widgets: [] },
  setDashboardState: () => void 0,
});
export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  setIsAuthenticated: () => void 0,
});

function App() {
  const [dashboardState, setDashboardState] = useState<DashboardState>({
    layouts: {},
    widgets: [],
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <>
      <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
        <DashboardContext.Provider
          value={{ dashboardState, setDashboardState }}
        >
          <BrowserRouter>
            <Navbar isAuthenticated={isAuthenticated} />
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
        </DashboardContext.Provider>
      </AuthContext.Provider>
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
