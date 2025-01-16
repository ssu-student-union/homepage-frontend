import { Badge } from '@/components/ui/badge';
import XdeleteImg from '@/assets/image/Xdelete.svg';
import { useResize } from '@/hooks/useResize';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

interface ServiceNoticeTabProps {
  isEmergency: boolean;
  Title: string | undefined;
  postId: Number | undefined;
}

export function ServiceNoticeTab({ isEmergency, Title, postId }: ServiceNoticeTabProps) {
  const [open, setOpen] = useState(true);
  const [hasCookie, setHasCookie] = useState(true);
  const [cookies, setCookies] = useCookies();

  const handleClose = () => {
    setOpen(false);
  };

  const getExpiredDate = (days: number) => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date;
  };

  //웹페이지 열었을 때 쿠키 유무 확인
  useEffect(() => {
    if (cookies['HBB_Cookie']) {
      setHasCookie(true);
    } else setHasCookie(false);
  }, []);

  // 닫기 버튼을 누를 때마다 실행될 코드.
  useEffect(() => {
    if (!open) {
      //쿠키를 저장하는 핵심 코드
      const expires = getExpiredDate(1);
      setCookies('HBB_Cookie', true, { path: '/', expires });
    }
  }, [open]);

  const { width } = useResize();

  const navigate = useNavigate();
  const handleTabClick = () => {
    navigate(`/service-notice/${postId}`);
  };

  useEffect(() => {}, [width]);

  return (
    <>
      {!hasCookie && open? (
        <div className="fixed top-[60px] z-50 flex h-[64px] w-full animate-slideDown items-center justify-center gap-[8px] border-b-[1px] border-[#9CA3AF] bg-white pl-[10px] pr-[10px] xs:top-[48px] sm:top-[50px] md:top-[50px]">
          <div className="flex cursor-pointer items-center justify-center gap-[8px]" onClick={handleTabClick}>
            {isEmergency ? (
              <Badge variant="Emergency" className="relative right-0 top-0">
                긴급
              </Badge>
            ) : (
              <div></div>
            )}
            <div className="text-[18px] font-[700] xs:text-[12px] sm:text-[12px]">{Title}</div>
          </div>
          <div className="absolute right-[20px] flex gap-[4px] text-[18px]" onClick={handleClose}>
            {width >= 1080 ? <div className="text-[#9CA3AF]">하루동안 보지 않기</div> : null}
            {width >= 1080 ? <img src={XdeleteImg} alt="삭제 버튼" className="cursor-pointer" /> : null}
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}
