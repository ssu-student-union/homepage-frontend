import { HeadLayout } from '@/template/HeadLayout';
import { BodyLayout } from '@/template/BodyLayout';
import { BoardSelector } from '@/components/Board/BoardSelector';
import { useNavigate } from 'react-router-dom';
import { categoryMap } from './const/data';
import { useLostBoard } from './hook/useLostBoard';
import { BoardContent } from '@/template/board/BoardContent';

export function LostArticlePage() {
  const boardCode = '분실물게시판';
  const { data, totalPages, currentPage, handlePageChange, categoryParam, subcategories, isLoading } =
    useLostBoard(boardCode);

  const navigate = useNavigate();

  return (
    <>
      <HeadLayout
        title="분실물게시판"
        subtitle="학생서비스팀, 학생자치기구, 숭실대학교 학생들의 분실물 통합 게시판"
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
        children={<BoardContent data={data?.data.postListResDto} boardName="분실물게시판" isLoading={isLoading} />}
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onWriteClick={() => {
          navigate(`/lost-article/edit`);
        }}
        className="pt-[32px]"
        authority={data?.data.allowedAuthorities}
      />
    </>
  );
}
