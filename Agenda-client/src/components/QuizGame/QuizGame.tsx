import { useEffect, useState } from 'react';
import Quiz from 'react-quiz-component';
import './Quizgame.css';
import { Widget } from '../widget/Widget';
import WidgetHeader from '../widgetHeader/WidgetHeader';
import { useLectureContext } from '../../context/LectureContext';

function QuizGame({ widget }: { widget: Widget }) {
  const { lectureName } = useLectureContext();
  const [quizData, setQuizData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setQuizData(null);
  }, [lectureName]);

  const backendURL =
    import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

  const loadQuiz = () => {
    setIsLoading(true);
    fetch(`${backendURL}/quiz-questions/${encodeURIComponent(lectureName)}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setQuizData(data);
      })
      .catch((error) => {
        console.error('Error fetching quiz questions:', error);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <WidgetHeader widget={widget}>
        Quiz of the day: {lectureName}
      </WidgetHeader>
      {!quizData && !isLoading && (
        <button
          onClick={loadQuiz}
          className="bg-cp-blue mt-20 text-white font-bold py-2 px-4 rounded-md hover:bg-cp-middle-blue focus:outline-none focus:shadow-outline text-center mx-auto block"
        >
          Load Quiz
        </button>
      )}
      {isLoading && <p>Loading quiz...</p>}
      {quizData && <Quiz quiz={quizData} shuffleAnswer={true} />}
    </>
  );
}

export default QuizGame;
