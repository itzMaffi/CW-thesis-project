import { FC } from 'react';

interface CurriculumProgressProps {
  progress: number;
}

export const CurriculumProgress: FC<CurriculumProgressProps> = ({
  progress = 0,
}) => {
  return (
    <div className="progressBar flex flex-col pt-2">
      <p className="text-[#aab8c2] text-bold">Course progress</p>
      <h2 className="text-cw-orange font-bold">{progress}% completed</h2>
      <div className="progressBarContainer bg-cw-light-orange rounded-[20px]">
        <div
          className={`progressBarFiller bg-cw-orange  rounded-[20px] h-[24px]`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};