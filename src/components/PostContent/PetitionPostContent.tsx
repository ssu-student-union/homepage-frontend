import { useResize } from '@/hooks/useResize';
import { ThumbsUp } from '@phosphor-icons/react';
import { PostListDtoResponse } from '../PostTextPetition/types';
import { formatYYYYMMDD } from '@/utils/formatYYYYMMDD';

interface PetitionPostContentProps {
  data: PostListDtoResponse;
  onClick: (id: number) => void;
}

export function PetitionPostContent({ data, onClick }: PetitionPostContentProps) {
  const { width } = useResize();
  const isSmallScreen = width <= 390;
  return (
    <div className="flex cursor-pointer justify-between border-b border-b-gray-400 p-5 text-[1.125rem] font-medium xs:flex-col xs:p-2 xs:text-[0.75rem] sm:flex-col sm:p-2">
      <div className="flex gap-5 xs:mb-[11px] sm:mb-[11px]" onClick={() => onClick(data.postId)}>
        <div className="w-20 whitespace-nowrap text-indigo-500">[{data.onGoingStatus}]</div>
        <div className="text-gray-700 underline decoration-white hover:decoration-gray-400 hover:underline-offset-1">
          {data.title}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="text-gray-500 xs:text-right sm:text-right">{formatYYYYMMDD(data.date)}</div>
        <div className="flex justify-end text-primary">
          <ThumbsUp size={isSmallScreen ? 14 : 25} />
          <span>{data.likeCount}</span>
        </div>
      </div>
    </div>
  );
}
