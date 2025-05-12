import { Badge } from '@/components/ui/badge';
import XdeleteImg from '@/assets/image/Xdelete.svg';
import { useResize } from '@/hooks/useResize';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
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
            'fixed top-12 z-40 flex h-12 w-full items-center justify-center gap-4 border-y border-[#9CA3AF] bg-white px-8 xl:top-16 xl:h-16',
            fadeOut ? 'animate-fadeout' : 'animate-fadein'
          )}
          onAnimationEnd={handleAnimationEnd}
        >
          <div className="flex cursor-pointer items-center justify-center gap-4" onClick={handleTabClick}>
            {isEmergency ? (
              <Badge variant="emergency-old" className="relative right-0 top-0">
                긴급
              </Badge>
            ) : (
              <div></div>
            )}
            <div className="text-[0.75rem] font-[700] md:text-[1.125rem]">{title}</div>
          </div>
          <div className="absolute right-6 flex gap-2 text-[1.125rem]" onClick={handleClose}>
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
