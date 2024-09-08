import { HeadLayout } from '@/template/HeadLayout';
import { BodyLayout } from '@/template/BodyLayout';
import { BoardSelector } from '@/components/Board/BoardSelector';
import { useNavigate } from 'react-router-dom';
import { categoryMap } from './const/data';
import { AuditContent } from '../audit/component/AuditContent';
import { useLostBoard } from './hook/useLostBoard';

export function LostArticlePage() {
  const boardCode = '분실물게시판';
  const { posts, totalPages, currentPage, handlePageChange, categoryParam, subcategories, isLoading } =
    useLostBoard(boardCode);
  const navigate = useNavigate();

  return (
    <>
      <HeadLayout
        title="분실물게시판"
        subtitle="분실물 습득 후 분실물 센터 전달 관련 안내"
        className="px-[200px] xs:px-[30px] sm:px-[30px] md:px-[30px] lg:px-[30px]"
      />
      <BodyLayout
        selector={
          <BoardSelector
            subcategories={subcategories}
            selectedSubcategory={categoryMap[categoryParam] || '전체'}
            onSubcategorySelect={(selectedCategory) => {
              const categoryKey = Object.keys(categoryMap).find((key) => categoryMap[key] === selectedCategory);
              if (categoryKey) {
                navigate(`/lost-article?category=${categoryKey}`);
              }
            }}
          />
        }
        children={<AuditContent initPosts={posts} isLoading={isLoading} />}
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onWriteClick={() => {
          navigate(`/lost-article/edit`);
        }}
        className="pt-[32px]"
      />
    </>
  );
}
