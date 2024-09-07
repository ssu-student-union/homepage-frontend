import { HeadLayout } from '@/template/HeadLayout';
import { BodyLayout } from '@/template/BodyLayout';
import { NoticeContent } from './component/NoticeContent';
import { BoardSelector } from '@/components/Board/BoardSelector';
import { useNoticeBoard } from './hooks/useNoticeBoard';
import { categoryMap } from './const/data';
import { useNavigate } from 'react-router-dom';
import { NoticeNavSection } from './component/NoticeNavSection';

export function NoticePage() {
  const boardCode = '공지사항게시판';
  const { posts, totalPages, currentPage, handlePageChange, categoryParam, subcategories, isLoading } =
  useNoticeBoard(boardCode);
  const navigate = useNavigate();

  return (
    <>
      <HeadLayout
        title="공지사항"
        subtitle="오늘 총 5개의 공지가 올라왔어요!"
        borderOff={true}
        className="px-[200px] xs:px-[30px] sm:px-[30px] md:px-[30px] lg:px-[30px]"
      />
      <NoticeNavSection
        categoryParam="audit"
        subCategoryParam="notice"
        handleSelection={() => {}}
        mainCategoryName="게시판"
        subCategoryDisplayName="소개"
        isHidden={false}
        className="mx-[200px] xs:mx-[30px] sm:mx-[30px] md:mx-[30px] lg:mx-[30px]"
      />
      <BodyLayout
        selector={
          <BoardSelector
            subcategories={subcategories}
            selectedSubcategory={categoryMap[categoryParam] || '전체'}
            onSubcategorySelect={(selectedCategory) => {
              const categoryKey = Object.keys(categoryMap).find((key) => categoryMap[key] === selectedCategory);
              if (categoryKey) {
                navigate(`/homepage-frontend/notice?category=${categoryKey}`);
              }
            }}
          />
        }
        children={<NoticeContent initPosts={posts} isLoading={isLoading} />}
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onWriteClick={() => {
          navigate(`/homepage-frontend/notice/edit`);
        }}
        className="pt-[32px]"
      />
    </>
  );
}
