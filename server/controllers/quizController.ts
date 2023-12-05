import { Request, Response } from 'express';
import { promises as fsPromises } from 'fs';
import path from 'path';

async function getQuizQuestions(req: Request, res: Response) {
  const lectureName = req.params.lectureName;

  // Path Traversal Security Check
  if (lectureName.includes('..')) {
    return res.status(400).send('Invalid lecture name.');
  }

  const filePath = path.join(
    __dirname,
    '..',
    'assets',
    'quiz-questions',
    lectureName,
    'questions.json'
  );

  try {
    if (!(await fsPromises.stat(filePath))) {
      return res.status(404).send('Quiz questions file not found.');
    }

    const data = await fsPromises.readFile(filePath, 'utf8');
    res.json(JSON.parse(data));
  } catch (err) {
    res.status(404).send('Error reading quiz questions file.');
  }
}

export { getQuizQuestions };
