import { HeadLayout } from '@/template/HeadLayout';
import { BodyLayout } from '@/template/BodyLayout';
import { AuditContent } from './component/AuditContent';
import { IntroNavSection } from '../intro/container/IntroNavSection';
import { useGetBoardBoardCodePosts } from '@/hooks/useGetBoardBoardCodePosts';
import { useResponseBoard } from '../../hooks/useResponseBoard';
import { useEffect } from 'react';
import { useCurrentPage } from '@/hooks/useCurrentPage';
import { BoardSelector } from '@/components/Board/BoardSelector';
import { useCategory } from './hooks/useCategory';
import { categoryMap } from './const/data';

export function AuditPage() {
  // 게시판 CODE
  const boardCode = '감사기구게시판';

  // 화면 크기에 따라 가져오는 hook
  const { itemsPerPage } = useResponseBoard();

  // 페이지 갱신 hook
  const { currentPage, handlePageChange } = useCurrentPage();

  const subcategories = Object.values(categoryMap).filter(Boolean) as string[];

  // category 갱신 hook
  const { navigate, categoryParam } = useCategory();

  // '전체'일 때 null을 전달하고, 그렇지 않으면 해당 카테고리 값을 전달
  const selectedCategory = categoryMap[categoryParam] == '전체' ? null : categoryMap[categoryParam];

  // api 호출
  const { posts, totalPages, refetch } = useGetBoardBoardCodePosts({
    boardCode,
    take: itemsPerPage,
    page: currentPage,
    category: selectedCategory,
  });

  // 화면, 페이지, 카테고리가 바뀌면 refetch
  useEffect(() => {
    refetch();
    console.log(posts);
  }, [itemsPerPage, currentPage, selectedCategory]);

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
              const categoryKey = Object.keys(categoryMap).find((key) => categoryMap[key] == selectedCategory);
              if (categoryKey) {
                navigate(`/audit?category=${categoryKey}`);
              }
            }}
          />
        }
        children={<AuditContent initPosts={posts} />}
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onWriteClick={() => {
          navigate(`/audit/edit`);
        }}
        className="pt-[32px]"
      />
    </>
  );
}
