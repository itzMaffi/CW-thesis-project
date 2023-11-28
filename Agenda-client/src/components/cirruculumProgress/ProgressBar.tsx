import { FC } from 'react';

interface ProgressBarProps {
  progress: number;
}

export const ProgressBar: FC<ProgressBarProps> = ({ progress = 0 }) => {
  return (
    <div className="progressBar flex flex-col ">
      <h2 className="text-[#FC6F2A] text-xl font-bold p-[15px]">
        {progress}% completed
      </h2>
      <div className="progressBarContainer bg-[#FEE2D4] rounded-[20px] h-[36px]">
        <div
          className={`progressBarFiller bg-[#FC6F2A] rounded-[20px] h-[36px]`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};
