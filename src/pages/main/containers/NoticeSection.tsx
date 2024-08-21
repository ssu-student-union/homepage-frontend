import { BoardSelector } from '@/components/Board/BoardSelector';
import { Spacing } from '@/components/Spacing';
import { MainSubcategories } from '../const';
import { useBoardSelect } from '@/hooks/useBoardSelect';
import { MainSubcategoriesType } from '../type';
import { Button } from '@/components/ui/button';
import { PostCardNotice } from '@/components/PostCard/PostCardNotice';
import { useResize } from '@/hooks/useResize';

interface NoticeSectionProps {
  noticeCount: number;
}

const NoticeSection = ({ noticeCount }: NoticeSectionProps) => {
  const { selectedSubcategories, onSubcategorySelect } = useBoardSelect<MainSubcategoriesType>(MainSubcategories[0]);
  const { width } = useResize();

  return (
    <section className="w-full whitespace-nowrap">
      <h1 className="text-[2rem] font-bold xs:text-[1.25rem]">공지사항</h1>
      <Spacing size={11} direction="vertical" />
      <p className="font-bold">
        <span>오늘 </span>
        <span className="text-primary">{`${noticeCount}개`}</span>
        <span>{`의 공지가 올라왔어요!`}</span>
      </p>
      <Spacing size={21} direction="vertical" />

      <BoardSelector
        subcategories={MainSubcategories}
        selectedSubcategory={selectedSubcategories}
        onSubcategorySelect={onSubcategorySelect}
      />

      <Spacing size={width > 390 ? 32 : 22} direction="vertical" />
      <div className="flex flex-col md:items-center lg:items-center xl:items-center xxl:items-center">
        {/* xs */}
        {width < 390 ? (
          <div className="flex w-[calc(100dvw-3.125rem)] gap-[1.063rem] overflow-x-scroll pr-[1.063rem]">
            {Array.from({ length: 3 }).map((_) => (
              <PostCardNotice></PostCardNotice>
            ))}
          </div>
        ) : null}
        {/* sm, md */}
        {width < 1080 && width >= 390 ? (
          <div className="flex w-[calc(100dvw-3.125rem)] gap-[1.063rem] overflow-x-scroll pr-[1.063rem]">
            {Array.from({ length: 3 }).map((_) => (
              <PostCardNotice></PostCardNotice>
            ))}
          </div>
        ) : null}
        {/* lg */}
        {width < 1440 && width >= 1080 ? (
          <div className="flex h-fit w-full justify-between gap-[26px]">
            {Array.from({ length: 2 }).map((_) => (
              <PostCardNotice></PostCardNotice>
            ))}
          </div>
        ) : null}
        {/* xl */}
        {width >= 1440 && width < 1920 ? (
          <div className="flex h-fit w-full justify-between">
            {Array.from({ length: 3 }).map((_) => (
              <PostCardNotice></PostCardNotice>
            ))}
          </div>
        ) : null}
        {/* xxl */}
        {width >= 1920 ? (
          <div className="flex h-fit w-full justify-between">
            {Array.from({ length: 4 }).map((_) => (
              <PostCardNotice></PostCardNotice>
            ))}
          </div>
        ) : null}
        <Spacing size={68} direction="vertical"></Spacing>
        {width >= 720 ? (
          <Button className="h-fit w-fit rounded-full px-[1rem] py-[0.5rem] text-[1rem]">더 알아보기</Button>
        ) : null}
      </div>
    </section>
  );
};

export default NoticeSection;
