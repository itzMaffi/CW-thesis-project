import { Params, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Lecture from './interfaces/Lecture';
import curriculumDb from './data/curriculumDb';
import { useNavigate } from 'react-router-dom';
import layoutDb from '../../utils/layoutsDB';
import { Widget, WidgetType } from '../../utils/Widget';


export default function LectureComponent() {
  const { lectureId }: Readonly<Params<string>> = useParams();
  const [lecture, setLecture] = useState<Lecture>();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const lecture = await curriculumDb.getLectureBy(+(lectureId ?? 1));
      setLecture(lecture);
    })();
  }, []);

  async function onPin() {
    const widget:Widget = new Widget(WidgetType.pinnedLecture);
    await curriculumDb.pinLectureBy(+lectureId!, widget.i);
    
    await layoutDb.saveWidget(widget);
    navigate('/');
  }

  return (
    <>
      <div className="flex align-center justify-center w-full">
        {lecture && (
          <div className="flex flex-col rounded-md border border-orange-400 divide-dashed w-3/5 h-screen">
            <button
              onClick={onPin}
              className="bg-blue-700 rounded-sm text-white p-1.5 self-end w-1/6"
            >
              Pin
            </button>
            <h2 className="text-2xl">{lecture.name}</h2>
            <iframe
              width="420"
              height="315"
              src="https://www.youtube.com/embed/tgbNymZ7vqY"
            ></iframe>
            <h3 className="text-xl">Code examples:</h3>
            <p>{lecture.codeExamples}</p>
            <h3 className="text-xl">Extra Resources:</h3>
            <p>{lecture.extraResources}</p>
            <h3 className="text-xl">Summary:</h3>
            <ul>{lecture.summary}</ul>
          </div>
        )}
        {!lecture && <h3 className="text-xl">lecture does not exist</h3>}
      </div>
    </>
  );
}
