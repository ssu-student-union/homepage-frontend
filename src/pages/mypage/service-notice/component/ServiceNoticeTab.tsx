import { Badge } from '@/components/ui/badge';
import XdeleteImg from '@/assets/image/Xdelete.svg';
import { useResize } from '@/hooks/useResize';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/libs/utils';

interface ServiceNoticeTabProps {
  isEmergency: boolean;
  title: string | undefined;
  postId: number | undefined;
}

export function ServiceNoticeTab({ isEmergency, title, postId }: ServiceNoticeTabProps) {
  const [open, setOpen] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [hasCookie, setHasCookie] = useState(true);
  const [cookies, setCookies] = useCookies();

  const handleClose = () => {
    setFadeOut(true);
  };

  const getExpiredDate = (days: number) => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date;
  };

  useEffect(() => {
    if (cookies['HBB_Cookie']) {
      setHasCookie(true);
    } else setHasCookie(false);
  }, [cookies, setCookies]);

  useEffect(() => {
    if (!open) {
      const expires = getExpiredDate(1);
      setCookies('HBB_Cookie', true, { path: '/', expires });
    }
  }, [open, setCookies]);

  const { width } = useResize();

  const navigate = useNavigate();
  const handleTabClick = () => {
    navigate(`/service-notice/${postId}`);
  };

  const handleAnimationEnd = () => {
    if (fadeOut) setOpen(false);
  };

  return (
    <>
      {!hasCookie && open ? (
        <div
          className={cn(
            'fixed top-[48px] z-40 flex h-[48px] w-full items-center justify-center gap-[8px] border-b-[1px] border-[#9CA3AF] bg-white pl-[10px] pr-[10px] sm:top-[50px] md:top-[60px] md:h-[64px]',
            fadeOut ? 'animate-fadeout' : 'animate-fadein'
          )}
          onAnimationEnd={handleAnimationEnd}
        >
          <div className="flex cursor-pointer items-center justify-center gap-[8px]" onClick={handleTabClick}>
            {isEmergency ? (
              <Badge variant="Emergency" className="relative right-0 top-0">
                긴급
              </Badge>
            ) : (
              <div></div>
            )}
            <div className="text-[12px] font-[700] md:text-[18px]">{title}</div>
          </div>
          <div className="absolute right-[20px] flex gap-[4px] text-[18px]" onClick={handleClose}>
            {width >= 1080 ? <div className="text-[#9CA3AF]">하루동안 보지 않기</div> : null}
            {width >= 720 ? <img src={XdeleteImg} alt="삭제 버튼" className="cursor-pointer" /> : null}
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}

ServiceNoticeTab.Skeleton = () => {
  return <Skeleton className={cn('flex h-[64px] w-full')} />;
};
