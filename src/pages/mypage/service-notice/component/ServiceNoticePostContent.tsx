import { useResize } from '@/hooks/useResize';
import { Badge } from '@/components/ui/badge';
import { useEffect, useState } from 'react';

interface ServiceNoticePostContentProps {
  title: string;
  date: string;
  Emergency: boolean;
}

export function ServiceNoticePostContent({title, date, Emergency}: ServiceNoticePostContentProps) {
  const [contentWidth, setContentWidth] = useState(1520); // 초기값은 1520px로 설정
  const { width } = useResize();

  useEffect(() => {
    if (width >= 1440) {
      setContentWidth(1520);
    } else if (width >= 1080 && width < 1440) {
      setContentWidth(1040);
    } else if (width >= 720 && width < 1080) {
      setContentWidth(936);
    } else if (width >= 390 && width < 720) {
      setContentWidth(596);
    } else {
      setContentWidth(316);
    }
  }, [width]);

  return (
    <>
      <div className="flex h-[64px] border-b-[1px]" style={{ width: `${contentWidth}px` }}>
        {Emergency ? 
          <Badge variant="Emergency" className="relative top-[22px]">
            긴급
          </Badge> :
          <div className='w-[54px] h-[23px]'></div>
        }
        <div className="flex w-full items-center justify-between">
          <div className="ml-[20px] font-pretendard text-[18px] font-[500]">
            {title}
          </div>
          <div>{date}</div>
        </div>
      </div>
    </>
  );
}
