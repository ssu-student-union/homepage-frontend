import { Badge } from '@/components/ui/badge';
import { useContentWidth } from '../hooks/useContetnWidth';
import { cn } from '@/libs/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { formatYYYYMMDD } from '@/utils/formatYYYYMMDD';
import { LinkProps } from 'react-router';
import { Link } from 'react-router';
interface ServiceNoticePostContentProps extends LinkProps {
  postId?: string;
  title?: string;
  date?: string;
  Emergency?: boolean;
  className?: string;
}

export function ServiceNoticePostContent({
  title,
  date,
  Emergency,
  className,
  ...props
}: ServiceNoticePostContentProps) {
  const contentWidth = useContentWidth();
  const formattedDate = date ? formatYYYYMMDD(date) : '';
  const mobileText =
    contentWidth === 316
      ? 'text-[12px] font-[500]'
      : '';

  return (
    <Link
      {...props}
      className={cn('flex h-[64px] w-full border-b-[1px] border-[#9CA3AF]', className)}
    >
      {Emergency ? (
        <Badge variant="emergency-old" className="relative top-[22px] text-[12px]">
          긴급
        </Badge>
      ) : (
        <div className="h-[23px] w-[54px]"></div>
      )}
      <div className="flex w-full cursor-pointer items-center justify-between gap-[8px] font-medium">
        <span className={`ml-[20px] ${mobileText} cursor-pointer`}>{title}</span>
        <div className={`${mobileText} min-w-[63px] text-[#6B7280] md:min-w-0`}>{formattedDate}</div>
      </div>
    </Link>
  );
}

ServiceNoticePostContent.Skeleton = () => {
  return <Skeleton className={cn('flex h-[64px] w-full')} />;
};
