import { Badge } from '@/components/ui/badge';
import { useContentWidth } from '../hooks/useContetnWidth';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/libs/utils';
import { Skeleton } from '@/components/ui/skeleton';

interface ServiceNoticePostContentProps {
  postId?: string;
  title?: string;
  date?: string;
  Emergency?: boolean;
  className?: string;
}

export function ServiceNoticePostContent({ postId, title, date, Emergency, className = '' }: ServiceNoticePostContentProps) {
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
    <div className={cn("flex h-[64px] border-b-[1px] border-[#9CA3AF]",className)} style={{ width: `${contentWidth}px` }}>
      {Emergency ? (
        <Badge variant="Emergency" className="relative top-[22px]">
          긴급  
        </Badge>
      ) : (
        <div className="h-[23px] w-[54px]"></div>
      )}
      <div className="flex w-full items-center justify-between gap-[8px] cursor-pointer" onClick={handleTitleClick}>
        <div className={`ml-[20px] ${mobileText} cursor-pointer`}>
          {title}
        </div>
        <div className={`${mobileText} sm:min-w-[63px] xs:min-w-[63px]`}>{date}</div>
      </div>
    </div>
  );
}

ServiceNoticePostContent.Skeleton = () => {
  const contentWidth = useContentWidth();
  return (
    <Skeleton
    className={cn("flex h-[64px]")} style={{ width: `${contentWidth}px` }}
    />
  );
};