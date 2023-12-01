const questions = {
  quizTitle: 'Codeworks Quiz',
  quizSynopsis: 'This is a small test to test your Codeworks knowledge',
  nrOfQuestions: '4',
  questions: [
    {
      question: 'ReactJS is developed by _____?',
      questionType: 'text',
      answerSelectionType: 'single',
      answers: ['Google Engineers', 'Facebook Engineers'],
      correctAnswer: '2',
      messageForCorrectAnswer: 'Correct answer. Good job.',
      messageForIncorrectAnswer: 'Incorrect answer. Please try again.',
      explanation:
        'React was created by Jordan Walke, a software engineer at Facebook. It was first released as an open-source project by Facebook in May 2013.',
      point: '20',
    },
    {
      question: 'What are the advantages of React JS?',
      questionType: 'text',
      answerSelectionType: 'multiple',
      answers: [
        'React can be used on client and as well as server side too with other frameworks',
        'Using React increases readability and makes maintainability easier. Component, Data patterns improves readability and thus makes it easier for manitaining larger apps',
        'React components have lifecycle events that fall into State/Property Updates',
        'React can be used with any other framework (Backbone.js, Angular.js) as it is only a view layer',
      ],
      correctAnswer: [1, 2, 4],
      messageForCorrectAnswer: 'Correct answer. Good job.',
      messageForIncorrectAnswer: 'Incorrect answer. Please try again.',
      point: '20',
    },
    {
      question: 'ReactJS is an MVC based framework?',
      questionType: 'text',
      answerSelectionType: 'single',
      answers: ['True', 'False'],
      correctAnswer: '2',
      messageForCorrectAnswer: 'Correct answer. Good job.',
      messageForIncorrectAnswer: 'Incorrect answer. Please try again.',
      explanation:
        'React itself is not strictly an MVC (Model-View-Controller) framework. Instead, React is primarily a JavaScript library for building user interfaces. However, you can implement a design pattern similar to MVC when developing React applications, especially with the help of additional libraries and tools.',
      point: '10',
    },
    {
      question: 'Choose the right picture',
      questionType: 'photo',
      answerSelectionType: 'single',
      answers: [
        'https://dummyimage.com/140x80/000/fff&text=A cow drinks water',
        'https://dummyimage.com/140x80/000/fff&text=A cow drinks milk',
      ],
      correctAnswer: '1',
      messageForCorrectAnswer: 'Correct answer. Good job.',
      messageForIncorrectAnswer: 'Incorrect answer. Please try again.',
      explanation: 'A cow drinks water and produces milk! 😜',
      point: '20',
    },
    {
      question: 'Which of the following concepts is/are key to ReactJS?',
      questionType: 'text',
      answerSelectionType: 'single',
      answers: [
        'Component-oriented design',
        'Event delegation model',
        'Both of the above',
      ],
      correctAnswer: '3',
      messageForCorrectAnswer: 'Correct answer. Good job.',
      messageForIncorrectAnswer: 'Incorrect answer. Please try again.',
      point: '30',
    },
    {
      question:
        'How can you access the state of a component from inside of a member function?',
      questionType: 'text',
      answerSelectionType: 'single',
      answers: [
        'this.getState()',
        'this.prototype.stateValue',
        'this.state',
        'this.values',
      ],
      correctAnswer: '3',
      messageForCorrectAnswer: 'Correct answer. Good job.',
      messageForIncorrectAnswer: 'Incorrect answer. Please try again.',
      point: '20',
    },
  ],
};

export default questions;
