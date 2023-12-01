export default interface ILecture {
  id: number;
  name: string;
  videos: IVideo[]
  codeExamples: string;
  summary: string;
  extraResources: string;
}

interface IVideo {
    "url":string,
    "questions":string[]
}