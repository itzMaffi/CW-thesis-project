// LectureContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';

interface LectureContextType {
  lectureName: string;
  setLectureName: (name: string) => void;
}

const LectureContext = createContext<LectureContextType>({
  lectureName: '',
  setLectureName: () => {}
});

export const useLectureContext = () => useContext(LectureContext);

interface LectureProviderProps {
  children: ReactNode;
}

export const LectureProvider = ({ children }: LectureProviderProps) => {
  const [lectureName, setLectureName] = useState('');

  return (
    <LectureContext.Provider value={{ lectureName, setLectureName }}>
      {children}
    </LectureContext.Provider>
  );
};
