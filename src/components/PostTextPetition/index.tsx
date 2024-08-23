import { ThumbsUp } from 'lucide-react';
import { ACTIVE_TAG, ANSWERED_TAG, CLOSED_TAG, RECEIVED_TAG } from '../StateTag/const';
import { useResize } from '@/hooks/useResize';
import { PostListDtoResponse } from './types';

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

  return (
    <div className="petition-item w-[362px] flex-shrink-0 cursor-pointer rounded-[13px] border border-gray-300 bg-white px-5 py-7 xs:w-[304px] xs:py-[15px]">
      <div className="flex flex-col">
        {renderStatusTag()}
        <div className="mb-[22px] mt-[7px] text-[1.375rem] font-bold text-gray-700 xs:mb-[12px] xs:text-[1rem]">
          {data?.title && truncateText(data.title, 18)}
        </div>
        <div className="mb-[14px] text-[1.125rem] font-medium text-gray-500 xs:mb-[9px] xs:text-[0.875rem]">
          {data?.content}
        </div>
        <div className="flex justify-between">
          <div className="text-[1.125rem] font-normal text-gray-400 xs:text-[0.875rem]">{data?.date}</div>
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
