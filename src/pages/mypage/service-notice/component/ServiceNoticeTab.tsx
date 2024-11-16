import { Badge } from '@/components/ui/badge';
import XdeleteImg from '@/assets/image/Xdelete.svg';
import { useResize } from '@/hooks/useResize';
import { useEffect } from 'react';

interface ServiceNoticeTabProps {
  Title: string;
}

export function ServiceNoticeTab({ Title }: ServiceNoticeTabProps) {
  const { width } = useResize();

  useEffect(() => {}, [width]);

  return (
    <div className="fixed top-[60px] md:top-[50px] sm:top-[50px] flex h-[64px] w-full animate-slideDown items-center justify-center gap-[8px] border-b-[1px] border-[#9CA3AF] bg-white z-50">
      <Badge variant="Emergency" className="relative right-0 top-0">
        긴급
      </Badge>
      <div className="text-[18px] font-[700]">{Title}</div>
      <div className="absolute right-[20px] flex gap-[4px] text-[18px]">
        {width >= 1080 ? <div className="text-[#9CA3AF]">하루동안 보지 않기</div> : null}
        {width >= 1080 ? <img src={XdeleteImg} alt="삭제 버튼" className="cursor-pointer" /> : null}
      </div>
    </div>
  );
}
