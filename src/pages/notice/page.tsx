import { HeadLayout } from '@/template/HeadLayout';
import { BoardSelector } from '@/components/Board/BoardSelector';
import { useNoticeBoard } from './hooks/useNoticeBoard';
import { useNoticeCategory } from './hooks/useNoticeCategory';
import { NoticeNavSection } from './component/NoticeNavSection';
import { useTodayPosts } from './hooks/useNoticeToday';
import { BodyLayout } from '@/template/BodyLayout';
import { Skeleton } from '@/components/ui/skeleton';
import { useNavigate } from 'react-router-dom';
import { BoardContent } from '@/template/board/BoardContent';

export function NoticePage() {
  const { category, subCategory, subCategorys, handleCategoryChange, handleSubCategoryChange } = useNoticeCategory();
  const boardCode = '공지사항게시판';
  const navigate = useNavigate();

  const { data, totalPages, currentPage, handlePageChange, isLoading } = useNoticeBoard(
    boardCode,
    category,
    subCategory
  );
  const { todayPostCount, isLoading: isPostsLoading } = useTodayPosts(boardCode, category, subCategory);

  return (
    <>
      <HeadLayout
        title="공지사항"
        subtitle={
          <>
            <span>오늘 총</span>
            {isPostsLoading ? (
              <Skeleton className="h-6 w-16 bg-gray-200" />
            ) : (
              <span className="text-primary"> {todayPostCount}개의 </span>
            )}
            <span>공지가 올라왔어요!</span>
          </>
        }
        borderOff={true}
        className="px-[200px] xs:px-[30px] sm:px-[30px] md:px-[30px] lg:px-[30px]"
      />
      <NoticeNavSection
        categoryParam={category}
        subCategoryParam={subCategory}
        handleSelection={handleCategoryChange}
        mainCategoryName="게시판"
        isHidden={false}
        className="mx-[200px] xs:mx-[30px] sm:mx-[30px] md:mx-[30px] lg:mx-[30px]"
      />
      <BodyLayout
        selector={
          <BoardSelector
            subcategories={subCategorys}
            selectedSubcategory={subCategory || '전체'}
            onSubcategorySelect={(number) => handleSubCategoryChange(number)}
          />
        }
        children={<BoardContent boardName="공지사항게시판" data={data?.data.postListResDto} isLoading={isLoading} />}
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onWriteClick={() => {
          navigate(`/notice/edit`);
        }}
        className="pt-[32px]"
        authority={data?.data.allowedAuthorities}
      />
    </>
  );
}
