import { FC } from 'react';

interface CurriculumProgressProps {
  progress: number;
}

export const CurriculumProgress: FC<CurriculumProgressProps> = ({
  progress = 0,
}) => {
  return (
    <div className="progressBar flex flex-col h-1/2">
      <p className="text-[#aab8c2] text-bold">Course progress</p>
      <h2 className="text-[#FC6F2A] text-xl font-bold">
        {progress}% completed
      </h2>
      <div className="progressBarContainer bg-[#FEE2D4] rounded-[20px]">
        <div
          className={`progressBarFiller bg-[#FC6F2A] rounded-[20px] h-[36px]`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};
