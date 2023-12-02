import Quiz from 'react-quiz-component';
import questions from './questions';
import './Quizgame.css';
import { Widget } from '../../utils/Widget';
import WidgetHeader from '../curriculum/WidgetHeader';

function QuizGame({ widget }: { widget: Widget }) {
  return (
    <>
      <WidgetHeader widget={widget}>Quiz of the day</WidgetHeader>
      <Quiz quiz={questions} shuffleAnswer={true} />
    </>
  );
}

export default QuizGame;

//credits (wingkwong): https://www.npmjs.com/package/react-quiz-component
