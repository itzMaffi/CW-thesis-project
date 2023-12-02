import { FC, useState } from 'react';
import axios from 'axios';

export const StackOverflow: FC = () => {
  const [query, setQuery] = useState('');
  const [answers, setAnswers] = useState([]);

  const fetchAnswers = async () => {
    try {
      const response = await axios.get(
        `https://api.stackexchange.com/2.3/search/advanced?order=desc&sort=activity&q=${query}&site=stackoverflow`
      );
      setAnswers(response.data.items);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };
  return (
    <div>
      <div>find a answer on Stack Overflow</div>

      <div>
        <input
          className="bg-orange-200"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={fetchAnswers}>Search</button>
        <ul>
          {answers.map((answer, index) => (
            <li key={index}>
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
