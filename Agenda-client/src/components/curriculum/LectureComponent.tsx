import { Params, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ILecture from './interfaces/Lecture';
import curriculumDb from './data/curriculumDb';
import LecturePin from './LecturePin';
import { CodeBlock, github } from 'react-code-blocks';

export default function LectureComponent() {
  const { lectureId }: Readonly<Params<string>> = useParams();
  const [lecture, setLecture] = useState<ILecture>();

  useEffect(() => {
    (async () => {
      const lectureFromDb = await curriculumDb.getLectureBy(+(lectureId ?? 1));
      setLecture(lectureFromDb);
    })();
  }, [lectureId]);

  return (
    <>
      <div className="flex align-center justify-center w-full">
        {lecture && (
          <div className="flex flex-col w-3/5 p-4 mb-32">
            <div className="flex mt-8 mb-8">
              <h2 className="ml-auto mr-auto text-3xl text-center">
                {lecture.name}
              </h2>
              <span className="text-3xl">
                <LecturePin lectureId={lecture.id}></LecturePin>
              </span>
            </div>
            <div className="flex flex-col items-center w-full">
              {lecture.videos && lecture.videos.map((video, index) => (
                <div className='mb-8' key={index}>
                  <iframe
                    className="rounded-md"
                    width="640"
                    height="360"
                    src={video.url}
                  ></iframe>
                  <h3 className="text-center mt-8  mb-2 text-2xl">
                    Check your knowledge
                  </h3>
                  <ul className="w-[640px] list-disc">
                    {video.questions.map((question, index)=> <li key={index}>{question}</li>)}
                  </ul>
                  {index !== lecture.videos.length-1 && <hr className='mt-4 ml-40 mr-40'></hr>}
                </div>
              ))}
            </div>
            <h3 className="text-2xl mt-8">Summary:</h3>
            <hr></hr>

            <ul>{lecture.summary}</ul>
            <h3 className="text-2xl mt-8">Code examples:</h3>
            <hr></hr>
            <div className='mt-8 text-xs'> 
              <CodeBlock text={lecture.codeExamples} language='javascript' theme={github}/>
            </div>
            <h3 className="text-2xl mt-8">Extra Resources:</h3>
            <hr></hr>

            <p>{lecture.extraResources}</p>
          </div>
        )}
        {!lecture && <h3 className="mt-8 text-xl">lecture does not exist</h3>}
      </div>
    </>
  );
}
