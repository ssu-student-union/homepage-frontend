import { useResize } from '@/hooks/useResize';
import { ThumbsUp } from '@phosphor-icons/react';
import { PostListDtoResponse } from '@/types/getPetitionTopLiked';
import { formatYYYYMMDD } from '@/utils/formatYYYYMMDD';
import useTruncateText from '@/hooks/useTruncateText';

interface PetitionPostContentProps {
  data: PostListDtoResponse;
  onClick: (id: number) => void;
}

/**
 * @deprecated 청원게시판 전용 컴포넌트입니다. 사용하지 않기를 권장합니다.
 */
export function PetitionPostContent({ data, onClick }: PetitionPostContentProps) {
  const { width } = useResize();

  const title = useTruncateText(data.title, 30);

  return (
    <>
      {width > 719 ? (
        <div className="flex-col border-b border-b-gray-400 p-5">
          <div className="flex items-center justify-between text-[1.125rem] font-medium">
            <div className="flex min-w-0 flex-1 items-center gap-5" onClick={() => onClick(data.postId)}>
              <div className="w-20 shrink-0 whitespace-nowrap text-indigo-500">{`[${data.onGoingStatus}]`}</div>
              <div className="flex-1 cursor-pointer text-gray-700 underline decoration-white hover:decoration-gray-400 hover:underline-offset-1">
                {title}
              </div>
            </div>
            <div className="ml-2 min-w-0 text-gray-500">{formatYYYYMMDD(data.date)}</div>
          </div>
          <div className="mt-2 flex justify-end space-x-1 text-primary">
            <ThumbsUp size={25} />
            <span>{data.likeCount}</span>
          </div>
        </div>
      ) : null}
      {width <= 720 ? (
        <div className="flex-col border-b border-b-gray-400 p-5">
          <div className="flex items-center justify-between text-[0.75rem] font-medium">
            <div className="min-w-0 flex-1 flex-col items-center gap-5" onClick={() => onClick(data.postId)}>
              <div className="flex">
                <div className="w-20 shrink-0 whitespace-nowrap text-indigo-500">{`[${data.onGoingStatus}]`}</div>
                <div className="flex-1 cursor-pointer text-gray-700 underline decoration-white hover:decoration-gray-400 hover:underline-offset-1">
                  {title}
                </div>
              </div>
              <div className="ml-2 flex min-w-0 justify-end text-gray-500">{formatYYYYMMDD(data.date)}</div>
              <div className="mt-2 flex justify-end space-x-1 text-primary">
                <ThumbsUp size={14} />
                <span>{data.likeCount}</span>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
