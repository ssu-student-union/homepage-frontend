import { ThumbsUp } from '@phosphor-icons/react';

export function PetitionPostContent() {
  return (
    <div className="flex cursor-pointer justify-between border-b border-b-gray-400 p-5 text-lg font-medium xs:flex-col xs:p-0 sm:flex-col sm:p-0">
      <div className="flex xs:mb-[11px] sm:mb-[11px]">
        <div className="whitespace-nowrap pr-5 text-indigo-500">[종료됨]</div>
        <div className="text-gray-700">청원제목청원제목청원제목청원제목청원제목청원제목</div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="text-gray-500 xs:text-right sm:text-right">2024/07/29</div>
        <div className="flex justify-end text-primary">
          <ThumbsUp size={25} />
          <span>32</span>
        </div>
      </div>
    </div>
  );
}
