import { Badge } from '@/components/ui/badge';
import { useContentWidth } from '../hook/useContetnWidth';
import { useNavigate } from 'react-router-dom';

interface ServiceNoticePostContentProps {
  postId: string;
  title: string;
  date: string;
  Emergency: boolean;
}

export function ServiceNoticePostContent({ postId, title, date, Emergency }: ServiceNoticePostContentProps) {
  const contentWidth = useContentWidth();
  const navigate = useNavigate();

  const mobileText =
    contentWidth === 316
      ? 'font-pretendard text-[12px] font-[500]' // Style for width 316
      : 'font-pretendard text-[18px] font-[500]'; // Default style

  const handleTitleClick = () => {
    navigate(`/service-notice/${postId}`);
  };

  return (
    <div className="flex h-[64px] border-b-[1px] border-[#9CA3AF]" style={{ width: `${contentWidth}px` }}>
      {Emergency ? (
        <Badge variant="Emergency" className="relative top-[22px]">
          긴급
        </Badge>
      ) : (
        <div className="h-[23px] w-[54px]"></div>
      )}
      <div className="flex w-full items-center justify-between gap-[8px]">
        <div className={`ml-[20px] ${mobileText} cursor-pointer`} onClick={handleTitleClick}>
          {title}
        </div>
        <div className={`${mobileText}`}>{date}</div>
      </div>
    </div>
  );
}
