import { useEffect, useState } from 'react';
import { Spacing } from '@/components/Spacing';
import { MAIN_PENDING } from '../const';
import FloatingButton from '@/components/Buttons/FloatingButton';
import KakaoIcon from '@/components/svg-icon/KakaoIcon';
import InstaIcon from '@/components/svg-icon/InstaIcon';
import ChannelTalkIcon from '@/components/svg-icon/ChannelTalkIcon';

export function FloatingButtons() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const target = document.getElementById(MAIN_PENDING);

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, []);

  return (
    <div
      className={`fixed right-4 top-20 z-30 transition-all duration-500 md:right-10${
        isVisible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-[-20px] opacity-0'
      }`}
    >
      <FloatingButton href="http://pf.kakao.com/_RZTKV">
        <KakaoIcon className="size-9 max-md:size-7" />
      </FloatingButton>
      <Spacing direction="vertical" size={13} />
      <FloatingButton href="https://www.instagram.com/ssure65th/">
        <InstaIcon className="size-9 max-md:size-7" />
      </FloatingButton>
      <Spacing direction="vertical" size={13} />
      <FloatingButton isChannelTalk={true}>
        <ChannelTalkIcon className="size-20 max-md:size-14" />
      </FloatingButton>
    </div>
  );
}
