
import { Badge } from '@/components/ui/badge';
import { useContentWidth } from '../hook/useContetnWidth';

interface ServiceNoticePostContentProps {
  title: string;
  date: string;
  Emergency: boolean;
}

export function ServiceNoticePostContent({ title, date, Emergency }: ServiceNoticePostContentProps) {
  const contentWidth = useContentWidth();

  return (
    <>
      <div className="flex h-[64px] border-b-[1px] border-[#9CA3AF]" style={{ width: `${contentWidth}px` }}>
        {Emergency ? (
          <Badge variant="Emergency" className="relative top-[22px]">
            긴급
          </Badge>
        ) : (
          <div className="w-[54px] h-[23px]"></div>
        )}
        <div className="flex w-full items-center justify-between">
          <div className="ml-[20px] font-pretendard text-[18px] font-[500]">{title}</div>
          <div>{date}</div>
        </div>
      </div>
    </>
  );
}
