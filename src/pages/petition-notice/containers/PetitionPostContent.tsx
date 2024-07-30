import { ThumbsUp } from "@phosphor-icons/react";

export function PetitionPostContent() {
  return (
    <div className="p-5 flex sm:flex-col xs:flex-col sm:p-0 xs:p-0 justify-between text-lg font-medium border-b border-b-gray-400 cursor-pointer">
      <div className="flex sm:mb-[11px] xs:mb-[11px]">
        <div className="pr-5 text-indigo-500 whitespace-nowrap">[종료됨]</div>
        <div className="text-gray-700">
          청원제목청원제목청원제목청원제목청원제목청원제목
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="text-gray-500 sm:text-right xs:text-right">
          2024/07/29
        </div>
        <div className="flex justify-end text-primary">
          <ThumbsUp size={25} />
          <span>32</span>
        </div>
      </div>
    </div>
  );
}
