import { HeadLayout } from '@/template/HeadLayout';
import { BodyLayout } from '@/template/BodyLayout';
import { NoticeContent } from './component/NoticeContent';
import { BoardSelector } from '@/components/Board/BoardSelector';
import { useNoticeBoard } from './hooks/useNoticeBoard';
import { subName } from './const/data';
import { useNoticeCategory } from './hooks/useNoticeCategory';
import { NoticeNavSection } from './component/NoticeNavSection';

export function NoticePage() {
  const { category, navigate, subCategory, handleCategoryChange, handleSubCategoryChange } = useNoticeCategory();

  const boardCode = '공지사항게시판';
  const { posts, totalPages, currentPage, handlePageChange, isLoading } = useNoticeBoard(boardCode);

  return (
    <>
      <HeadLayout
        title="공지사항"
        subtitle={
          <>
            <span>오늘 총</span>
            <span className="text-primary"> 5개의 </span>
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
        subCategoryDisplayName="소개"
        isHidden={false}
        className="mx-[200px] xs:mx-[30px] sm:mx-[30px] md:mx-[30px] lg:mx-[30px]"
      />
      <BodyLayout
        selector={
          <BoardSelector
            subcategories={subName}
            selectedSubcategory={subCategory || '전체'}
            onSubcategorySelect={handleSubCategoryChange}
          />
        }
        children={<NoticeContent initPosts={posts} isLoading={isLoading} />}
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onWriteClick={() => {
          navigate(`/notice/edit`);
        }}
        className="pt-[32px]"
      />
    </>
  );
}
