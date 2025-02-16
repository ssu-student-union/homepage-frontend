import { useEffect, useState } from 'react';
import Channel from '@/assets/image/channel_talk.svg';
import { InstaFloating, KakaoFloating, YoutubeFloating } from '@/components/Floating/Floating';
import { Spacing } from '@/components/Spacing';
import { MAIN_PENDING } from '../const';

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
      className={`fixed right-10 top-20 z-50 transform transition-all duration-500 xs:right-4 sm:right-4 ${
        isVisible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-[-20px] opacity-0'
      }`}
    >
      <KakaoFloating />
      <Spacing direction="vertical" size={13} />
      <InstaFloating />
      <Spacing direction="vertical" size={13} />
      <YoutubeFloating />
      <Spacing direction="vertical" size={13} />
      <button className="custom-button-1">
        <img className="h-20 w-20 xs:h-[64px] xs:w-[64px] sm:h-[64px] sm:w-[64px]" src={Channel} />
      </button>
    </div>
  );
}
