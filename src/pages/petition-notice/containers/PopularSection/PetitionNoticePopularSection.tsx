import { MutableRefObject, useCallback, useEffect, useState } from 'react';
import { LeftCarouselButton, RigthCarouselButton } from '@/components/Carousel';
import { PostTextPetition } from '@/components/PostTextPetition';
import { useIsOverflow } from '@/hooks/useIsOverflow';
import { useResize } from '@/hooks/useResize';
import { useGetPetitionTopLiked } from '@/hooks/api/get/useGetPetitionPostsTopLiked';
import { useNavigate } from 'react-router-dom';
import { PetitionNoticeHeadSection } from './HeadSection/PetitionNoticeHeadSection';
import { PetitionNoticeHeadSectionSkeleton } from './HeadSection/PetitionNoticeHeadSectionSkeleton';
import { PetitionNoticePopularSectionSkeleton } from './PetitionNoticePopularSectionSkeleton';

export function PetitionNoticePopularSection() {
  const { isFetching, isLoading, data } = useGetPetitionTopLiked({ page: 0, take: 4 });

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
  }, [ref]);
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

        setTimeout(() => {
          if (newScrollPosition >= current.scrollWidth - current.clientWidth - 1) {
            setScrollState('left');
          } else {
            setScrollState('both');
          }
        }, 300);
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

        setTimeout(() => {
          if (newScrollPosition === 0) {
            setScrollState('right');
          } else {
            setScrollState('both');
          }
        }, 300);
      }
    },
    [scrollPosition]
  );

  const handlePostDetail = (id: number) => {
    navigate(`/petition-notice/${id}`);
  };

  return (
    <>
      {isFetching && isLoading ? <PetitionNoticeHeadSectionSkeleton /> : <PetitionNoticeHeadSection />}
      {isFetching && isLoading ? (
        <PetitionNoticePopularSectionSkeleton />
      ) : data?.data && data.data.postListResDto.length! > 0 ? (
        <div className="relative mb-[33px] mt-[70px] pl-10 text-[1.75rem] font-bold max-md:mb-[66px] xl:pl-[200px] ">
          <p className="mb-[11px]">인기청원</p>
          <div className="scrollbar-hide flex gap-6 overflow-scroll pr-5" ref={ref}>
            {data?.data.postListResDto &&
              data?.data.postListResDto.map((content) => (
                <PostTextPetition data={content} key={content.postId} onClick={handlePostDetail} />
              ))}
          </div>
          {isOverflow && data?.data.postListResDto && data?.data.postListResDto.length > 0 && (
            <>
              {(scrollState === 'left' || scrollState === 'both') && (
                <LeftCarouselButton onClick={() => moveLeft(ref)} />
              )}
              {(scrollState === 'right' || scrollState === 'both') && (
                <RigthCarouselButton onClick={() => moveRight(ref)} />
              )}
            </>
          )}
        </div>
      ) : (
        <div className="relative mb-[33px] pb-[50px] pt-[100px] text-center text-xs font-normal text-gray-600 sm:mb-[66px] sm:text-lg">
          <div>인기 청원이 없습니다.</div>
        </div>
      )}
    </>
  );
}
