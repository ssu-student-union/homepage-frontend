import { ThumbsUp } from 'lucide-react';
import { ACTIVE_TAG, ANSWERED_TAG, CLOSED_TAG, RECEIVED_TAG } from '../StateTag/const';
import { useResize } from '@/hooks/useResize';
import { Spacing } from '../Spacing';
import { formatYYYYMMDD } from '@/utils/formatYYYYMMDD';
import { PostListDtoResponse } from '@/types/getPetitionTopLiked';

interface PostTextPetitionProps {
  data: PostListDtoResponse;
}

export function PostTextPetition({ data }: PostTextPetitionProps) {
  const { width } = useResize();
  const isSmallScreen = width <= 391;

  const renderStatusTag = () => {
    switch (data?.onGoingStatus) {
      case '진행중':
        return <ACTIVE_TAG isActive={true} />;
      case '접수완료':
        return <RECEIVED_TAG isActive={true} />;
      case '답변완료':
        return <ANSWERED_TAG isActive={true} />;
      case '종료됨':
        return <CLOSED_TAG isActive={true} />;
      default:
        return null;
    }
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trim() + '…';
  };

  // const pattern = /<h3>청원내용<\/h3><h6><br><\/h6><p>([\s\S]*?)<\/p>/;
  // const petition_content_summation = data.content!.match(pattern);

  return (
    <div className="petition-item flex h-[252px] w-[362px] flex-shrink-0 cursor-pointer items-center justify-center rounded-[13px] border border-gray-300 bg-white px-[1.25rem] xs:h-[184px] xs:w-[304px]">
      <div className="flex flex-col">
        {renderStatusTag()}
        <Spacing size={7} direction="vertical" />
        <div className="text-[1.375rem] font-bold text-gray-700 xs:text-[1rem]">
          {data?.title && truncateText(data.title, 17)}
        </div>
        <Spacing size={width > 390 ? 22 : 12} direction="vertical" />
        <div className="mb-[14px] w-[320px] text-[1.125rem] font-medium text-gray-500 xs:mb-[9px] xs:w-[250px] xs:text-[0.875rem]">
          {data?.content && truncateText(data?.content, 76)}
          {/* {truncateText(petition_content_summation![1], 65)} */}
        </div>
        <div className="flex justify-between">
          <div className="text-[1.125rem] font-normal text-gray-400 xs:text-[0.875rem]">
            {formatYYYYMMDD(data?.date)}
          </div>
          <div className="flex gap-1 text-[#7D7BFF]">
            <span className="cursor-pointer xs:pb-[9px] xs:pt-0">
              <ThumbsUp size={isSmallScreen ? 14 : 22} />
            </span>
            <span className="text-[1.125rem] font-medium xs:text-[0.875rem]">{data?.likeCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
