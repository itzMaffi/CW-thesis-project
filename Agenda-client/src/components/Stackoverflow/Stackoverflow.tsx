import { FC, useState } from 'react';
import axios from 'axios';
import { Widget } from '../widget/Widget';
import WidgetHeader from '../widgetHeader/WidgetHeader';
import stackoverflow from '../../assets/Stack_Overflow.png';
interface Answer {
  title: string;
  question_id: string;
}

export const StackOverflow: FC<{ widget: Widget }> = ({
  widget,
}: {
  widget: Widget;
}) => {
  const [query, setQuery] = useState('');
  const [answers, setAnswers] = useState<Answer[]>([]);

  const fetchAnswers = async () => {
    try {
      if (query) {
        const response = await axios.get(
          `https://api.stackexchange.com/2.3/search/advanced?order=desc&sort=activity&q=${query}&site=stackoverflow`
        );
        setAnswers(response.data.items);
        setQuery('');
      }
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  const clearPreviousQuestionsHandler = () => {
    setAnswers([]);
  };

  return (
    <div>
      <WidgetHeader widget={widget}>
        <div className="pt-2"> Find similar questions on Stack Overflow</div>
      </WidgetHeader>

      <div>
        <div className="flex justify-center items-center gap-3 m-3">
          <input
            placeholder={'Type in your question here'}
            className="p-2 shadow-sm w-full placeholder-gray-400 rounded-md border border-slate-200 "
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && fetchAnswers()}
            onClick={clearPreviousQuestionsHandler}
          />
          <button
            className="w-24 bg-cw-orange font-bold font-sans text-white p-1 rounded-md  mt-1  hover:bg-cw-orange active:scale-90 shadow-lg active:shadow-inner"
            onClick={fetchAnswers}
          >
            Search
          </button>
        </div>

        <ul className="flex flex-col justify-center items-start pl-2">
          <div>
            <img
              className="w-19 opacity-10 fixed -z-20"
              src={stackoverflow}
              alt="stack overflow logo"
            />
          </div>

          {answers.map((answer, index) => (
            <li
              key={index}
              className="text-gray-700  w-full hover:bg-cw-light-orange hover:bg-opacity-30 cursor-pointer p-2"
            >
              <a
                href={`https://stackoverflow.com/questions/${answer.question_id}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {answer.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
