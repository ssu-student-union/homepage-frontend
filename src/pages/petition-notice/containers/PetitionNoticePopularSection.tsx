import { MutableRefObject, useCallback, useEffect, useState } from 'react';
import { LeftCarouselButton, RigthCarouselButton } from '@/components/Carousel';
import { PostTextPetition } from '@/components/PostTextPetition';
import { useIsOverflow } from '@/hooks/useIsOverflow';
import { useResize } from '@/hooks/useResize';
import { useGetPetitionTopLiked } from '@/hooks/useGetPetitionPostsTopLiked';
import { useNavigate } from 'react-router-dom';

export function PetitionNoticePopularSection() {
  const { data } = useGetPetitionTopLiked({ page: 0, take: 4 });

  const [ref, isOverflow] = useIsOverflow<HTMLDivElement>();
  const { width: windowWidth } = useResize();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollState, setScrollState] = useState<'left' | 'right' | 'both'>('right');
  const navigate = useNavigate();

  const handleScroll = (moveRef: MutableRefObject<HTMLDivElement | null>) => {
    const { current } = moveRef;

    if (current) {
      if (current.scrollLeft === 0) {
        setScrollState('right');
      } else if (current.scrollLeft >= current.scrollWidth - current.clientWidth - 1) {
        setScrollState('left');
      } else {
        setScrollState('both');
      }
    }
  };

  useEffect(() => {}, [windowWidth]);

  useEffect(() => {
    const { current } = ref;

    if (current) {
      current.addEventListener('scroll', () => handleScroll(ref));
    }
    return () => {
      if (current) {
        window.removeEventListener('scroll', () => handleScroll(ref));
      }
    };
  }, []);

  const moveRight = useCallback(
    (moveRef: MutableRefObject<HTMLDivElement | null>) => {
      const { current } = moveRef;
      if (current) {
        const petitionWidth = current.querySelector('.petition-item')?.clientWidth || 0;
        const newScrollPosition = Math.min(
          scrollPosition + petitionWidth + 25,
          current.scrollWidth - current.clientWidth
        );
        current.scrollTo({ left: newScrollPosition, behavior: 'smooth' });
        setScrollPosition(newScrollPosition);
      }
    },
    [scrollPosition]
  );

  const moveLeft = useCallback(
    (moveRef: MutableRefObject<HTMLDivElement | null>) => {
      const { current } = moveRef;
      if (current) {
        const petitionWidth = current.querySelector('.petition-item')?.clientWidth || 0;
        const newScrollPosition = Math.max(scrollPosition - petitionWidth - 25, 0);
        current.scrollTo({ left: newScrollPosition, behavior: 'smooth' });
        setScrollPosition(newScrollPosition);
      }
    },
    [scrollPosition]
  );

  const handlePostDetail = (id: number) => {
    navigate(`/petition-notice/${id}`);
  };

  return (
    <div className="relative mb-[66px] mt-[70px] pl-[200px] text-[1.75rem] font-bold xs:mb-[33px] xs:pl-10 sm:pl-10 md:pl-10 lg:pl-10">
      <p className="mb-[11px]">인기청원</p>
      <div className="flex gap-6 overflow-scroll pr-5 scrollbar-hide" ref={ref}>
        {data?.data.postListResDto &&
          data?.data.postListResDto.map((content) => (
            <PostTextPetition data={content} key={content.postId} onClick={handlePostDetail} />
          ))}
      </div>
      {isOverflow && data?.data.postListResDto && data?.data.postListResDto.length > 0 && (
        <>
          {(scrollState === 'left' || scrollState === 'both') && <LeftCarouselButton onClick={() => moveLeft(ref)} />}
          {(scrollState === 'right' || scrollState === 'both') && (
            <RigthCarouselButton onClick={() => moveRight(ref)} />
          )}
        </>
      )}
    </div>
  );
}
