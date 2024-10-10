import { HeadLayout } from '@/template/HeadLayout';
import { BodyLayout } from '@/template/BodyLayout';
import { IntroNavSection } from '../intro/container/IntroNavSection';
import { BoardSelector } from '@/components/Board/BoardSelector';
import { useAuditBoard } from './hooks/useAuditBoard';
import { categoryMap } from './const/data';
import { useNavigate } from 'react-router-dom';
import { BoardContent } from '@/template/board/BoardContent';

export function AuditPage() {
  const boardCode = '감사기구게시판';
  const { data, totalPages, currentPage, handlePageChange, categoryParam, subcategories, isLoading } =
    useAuditBoard(boardCode);

  const navigate = useNavigate();

  return (
    <>
      <HeadLayout
        title="감사기구"
        subtitle="제12대 중앙감사위원회 한빛"
        borderOff={true}
        className="px-[200px] xs:px-[30px] sm:px-[30px] md:px-[30px] lg:px-[30px]"
      />
      <IntroNavSection
        categoryParam="audit"
        subCategoryParam="notice"
        handleSelection={() => {}}
        mainCategoryName="게시판"
        subCategoryDisplayName="게시판"
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
                navigate(`/audit?category=${categoryKey}`);
              }
            }}
          />
        }
        children={<BoardContent data={data?.data.postListResDto} boardName="감사기구게시판" isLoading={isLoading} />}
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onWriteClick={() => {
          navigate(`/audit/edit`);
        }}
        className="pt-[32px]"
        authority={data?.data.allowedAuthorities}
      />
    </>
  );
}
