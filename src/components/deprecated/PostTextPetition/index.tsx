import { ThumbsUp } from 'lucide-react';
import { ACTIVE_TAG, ANSWERED_TAG, CLOSED_TAG, RECEIVED_TAG } from '../StateTag/const';
import { useResize } from '@/hooks/useResize';
import { formatYYYYMMDD } from '@/utils/formatYYYYMMDD';
import { PostTextPetitionProps } from './types';
import { useMemo } from 'react';
import useTruncateText from '@/hooks/useTruncateText';

/**
 * @deprecated 청원게시판 전용 컴포넌트입니다.
 */
export function PostTextPetition({ data, onClick }: PostTextPetitionProps) {
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

  const extractPetitionPurpose = (content: string) => {
    const purposeRegex = /<h3>청원취지<\/h3>.*?<p>(.*?)<\/p>/s;
    const match = content.match(purposeRegex);
    if (match && match[1]) {
      return match[1].replace(/<[^>]*>/g, '').trim();
    }
    return '';
  };

  const petitionPurpose = useMemo(() => {
    return data?.content ? extractPetitionPurpose(data.content) : '';
  }, [data?.content]);

  const title = useTruncateText(data.title, 18);
  const content = useTruncateText(petitionPurpose, 75);

  return (
    <div
      className="petition-item flex h-[184px] w-[304px] shrink-0 cursor-pointer flex-col justify-between rounded-[13px] border border-gray-300 bg-white p-4 md:h-[252px] md:w-[362px] md:p-5"
      onClick={() => onClick(data.postId)}
    >
      <div className="flex flex-col">
        {renderStatusTag()}
        <h3 className="mt-2 text-[1rem] font-bold text-gray-700 md:text-[1.375rem]">{title}</h3>
        <p className="mt-2 grow overflow-hidden text-ellipsis text-[0.875rem] font-medium text-gray-500 md:mt-3 md:text-[1.125rem]">
          {content}
        </p>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-[0.875rem] font-normal text-gray-400 md:text-[1.125rem]">
          {formatYYYYMMDD(data?.date)}
        </span>
        <div className="flex cursor-pointer items-center gap-1 text-[#7D7BFF]">
          <span className="pb-1">
            <ThumbsUp size={isSmallScreen ? 14 : 22} />
          </span>
          <span className="text-[0.875rem] font-medium md:text-[1.125rem]">{data?.likeCount}</span>
        </div>
      </div>
    </div>
  );
}
