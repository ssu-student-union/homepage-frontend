import { LeftCarouselButton, RigthCarouselButton } from '@/components/Carousel';
import { useIsOverflow } from '@/hooks/useIsOverflow';
import { useResize } from '@/hooks/useResize';
import { useEffect } from 'react';

export function PetitionNoticePopularSection() {
  const [ref, isOverflow] = useIsOverflow<HTMLDivElement>();
  const { width: windowWidth } = useResize();

  useEffect(() => {}, [windowWidth]);

  return (
    <div className="relative mt-[70px] pl-[200px] text-[28px] font-bold xs:pl-10 sm:pl-10 md:pl-10 lg:pl-10">
      <p className="mb-[11px]">인기청원</p>
      <div className="scrollbar-hide flex gap-6 overflow-scroll" ref={ref}>
        <div className="h-[237px] w-[362px] flex-shrink-0 bg-primary/40"></div>
        <div className="h-[237px] w-[362px] flex-shrink-0 bg-primary/40"></div>
        <div className="h-[237px] w-[362px] flex-shrink-0 bg-primary/40"></div>
        <div className="h-[237px] w-[362px] flex-shrink-0 bg-primary/40 "></div>
      </div>
      {isOverflow ? <RigthCarouselButton /> : <LeftCarouselButton />}
    </div>
  );
}
