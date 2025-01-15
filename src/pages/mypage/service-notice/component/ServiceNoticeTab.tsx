import { Badge } from '@/components/ui/badge';
import XdeleteImg from '@/assets/image/Xdelete.svg';
import { useResize } from '@/hooks/useResize';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface ServiceNoticeTabProps {
  isEmergency: boolean;
  Title: string | undefined;
  postId: Number | undefined;
}

export function ServiceNoticeTab({ isEmergency, Title, postId }: ServiceNoticeTabProps) {
  const { width } = useResize();

  const navigate = useNavigate();
  const handleTabClick = () => {
    navigate(`/service-notice/${postId}`);
  };

  useEffect(() => {}, [width]);

  return (
    <div className="fixed top-[60px] z-50 flex h-[64px] w-full animate-slideDown items-center justify-center gap-[8px] border-b-[1px] border-[#9CA3AF] bg-white pl-[10px] pr-[10px] xs:top-[48px] sm:top-[50px] md:top-[50px]">
      <div className='flex items-center justify-center gap-[8px] cursor-pointer' onClick={handleTabClick}>
        {isEmergency ? (
          <Badge variant="Emergency" className="relative right-0 top-0">
            긴급
          </Badge>
        ) : (
          <div></div>
        )}
        <div className="text-[18px] font-[700] xs:text-[12px] sm:text-[12px]">{Title}</div>
      </div>
      <div className="absolute right-[20px] flex gap-[4px] text-[18px]">
        {width >= 1080 ? <div className="text-[#9CA3AF]">하루동안 보지 않기</div> : null}
        {width >= 1080 ? <img src={XdeleteImg} alt="삭제 버튼" className="cursor-pointer" /> : null}
      </div>
    </div>
  );
}
