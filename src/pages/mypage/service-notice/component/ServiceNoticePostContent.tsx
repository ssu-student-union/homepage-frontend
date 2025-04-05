import { Badge } from '@/components/ui/badge';
import { useContentWidth } from '../hooks/useContetnWidth';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/libs/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { formatYYYYMMDD } from '@/utils/formatYYYYMMDD';

interface ServiceNoticePostContentProps {
  postId?: string;
  title?: string;
  date?: string;
  Emergency?: boolean;
  className?: string;
}

export function ServiceNoticePostContent({ postId, title, date, Emergency, className }: ServiceNoticePostContentProps) {
  const contentWidth = useContentWidth();
  const navigate = useNavigate();
  const formattedDate = date ? formatYYYYMMDD(date) : '';
  const mobileText =
    contentWidth === 316
      ? 'text-[12px] font-[500]' // Style for width 316
      : ''; // Default style

  const handleTitleClick = () => {
    navigate(`/service-notice/${postId}`);
  };

  return (
    <div
      className={cn('flex h-[64px] border-b-[1px] border-[#9CA3AF]', className)}
      style={{ width: `${contentWidth}px` }}
    >
      {Emergency ? (
        <Badge variant="emergency-old" className="relative top-[22px] text-[12px]">
          긴급
        </Badge>
      ) : (
        <div className="h-[23px] w-[54px]"></div>
      )}
      <div
        className="flex w-full cursor-pointer items-center justify-between gap-[8px] font-medium"
        onClick={handleTitleClick}
      >
        <span className={`ml-[20px] ${mobileText} cursor-pointer`}>{title}</span>
        <div className={`${mobileText} min-w-[63px] text-[#6B7280] md:min-w-0`}>{formattedDate}</div>
      </div>
    </div>
  );
}

ServiceNoticePostContent.Skeleton = () => {
  return <Skeleton className={cn('flex h-[64px] w-full')} />;
};
