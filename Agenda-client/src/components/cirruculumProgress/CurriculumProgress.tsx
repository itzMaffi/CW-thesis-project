import { FC } from 'react';
import WidgetHeader from '../widgetHeader/WidgetHeader';
import { Widget } from '../widget/Widget';
import { useEffect, useState } from 'react';
import { UserProgressDB } from './data/userProgressDb';

interface ICurriculumProgressProps {
  widget: Widget;
}

export const CurriculumProgress: FC<ICurriculumProgressProps> = ({
  widget,
}) => {

  const [progress, setProgress] = useState(0);

  useEffect(()=>{
    (async ()=> {
      const userProgress = await UserProgressDB.GetInstance().getUserProgress();
      setProgress(userProgress);
    })()
  })

  return (
    <div className="progressBar flex flex-col justify-between ">
      <WidgetHeader widget={widget}>Course progress</WidgetHeader>

      <h2 className="text-cp-blue font-bold pl-2 pt-6 pb-3">
        {progress}% completed
      </h2>
      <div className="progressBarContainer bg-cp-light-blue rounded">
        <div
          className={`progressBarFiller bg-cp-middle-blue  rounded h-[24px]`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};
