import { useEffect, useState } from 'react';
import { InstaFloating, KakaoFloating, YoutubeFloating } from '@/components/Floating/Floating';
import { Spacing } from '@/components/Spacing';
import { MAIN_PENDING } from '../const';
import ChannelTalkFloating from '@/components/Floating/ChannelTalkFloating';

export function CounselBtn() {
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
      className={`fixed right-4 top-20 z-50 transition-all duration-500 md:right-10${
        isVisible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-[-20px] opacity-0'
      }`}
    >
      <KakaoFloating />
      <Spacing direction="vertical" size={13} />
      <InstaFloating />
      <Spacing direction="vertical" size={13} />
      <YoutubeFloating />
      <Spacing direction="vertical" size={13} />
      <ChannelTalkFloating />
    </div>
  );
}
