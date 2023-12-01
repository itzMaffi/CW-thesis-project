export default interface ILecture {
  id: number;
  name: string;
  videos: [
    {
      "url":string,
      "questions":[string]
    }
  ]
  codeExamples: string;
  summary: string;
  extraResources: string;
}
