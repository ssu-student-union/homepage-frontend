import { HumanRightsCategory, HumanRightsPostSummaryResponse } from '@/pages/human-rights/schema.ts';
import { useSearchParams } from 'react-router';
import { SearchState } from '@/atoms/atom';
import { useSearchHumanRightsPosts } from '@/pages/human-rights/queries.ts';
import { useAtom } from 'jotai';
import { BoardListSkeleton } from '@/components/notice-refactor/board/BoardListSkeleton';
import { BoardList } from '@/components/notice-refactor/board/BoardList';

type SelectorCategory<T> = T extends T ? '전체' | T : never;

const categoryColors: { [category: string]: string } = {
  접수대기: 'text-gray-500',
  접수완료: 'text-primary',
} as const;

const ensureCategory = (str: string | null): SelectorCategory<HumanRightsCategory> => {
  if (str === '접수대기' || str === '접수완료') return str;
  return '전체';
};

const subtitle = (
  <p className="font-bold">
    해당 게시판을 통해 신고해주신 내용은 <span className="text-primary">학생인권위원회</span>에서 접수 및 처리됩니다.
  </p>
);

export function HumanRightsPage() {
  /* Obtain query parameters */
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') ?? '1') || 1;
  const category = ensureCategory(searchParams.get('category'));

  const boardType = '인권신고게시판';

  /* Search state management */
  // TODO: Use search parameters instead of recoil state
  const [q] = useAtom(SearchState);

  /* Load data from Query */
  const { data, isLoading, isError, error } = useSearchHumanRightsPosts({
    q,
    page: page - 1,
    category: category === '전체' ? undefined : category,
  });

  if (isLoading) {
    return <BoardListSkeleton boardType={boardType} subtitle={subtitle} />;
  }

  if (!data || isError) {
    // TODO: 오류 발생 시 세부정보 제공
    console.log(error);
    return (
      <div className="mt-16 flex items-center justify-center">
        <p>오류가 발생하였습니다. 관리자에게 문의하십시오.</p>
      </div>
    );
  }

  /* Data preparation */
  const { pageNum: currentPage, totalPages } = data.pageInfo;
  const posts = data.postListResDto;

  return (
    <BoardList<HumanRightsCategory, HumanRightsPostSummaryResponse>
      boardType={boardType}
      subtitle={subtitle}
      totalPages={totalPages}
      currentPage={currentPage + 1}
      authorityList={data.allowedAuthorities}
      toWritepath="human-rights/edit"
      category={category}
      subcategories={['전체', '접수대기', '접수완료']}
      categoryColors={categoryColors}
      setSearchParams={setSearchParams}
      page={page}
      posts={posts}
      getCategory={(post) => post.category || '접수대기'}
      getAuthor={(post) => post.reportName}
      getPostUrl={(post) => `/human-rights/${post.postId}`}
    />
  );
}
