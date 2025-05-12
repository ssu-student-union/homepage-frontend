import { SuggestCategory } from './schema';
import { useSearchParams } from 'react-router';
import { SearchState } from '@/atoms/atom';
import { useSearchSugNoticePosts } from './queries';
import { useAtom } from 'jotai';
import { BoardList } from '@/components/notice-refactor/board/BoardList';
import { BoardListSkeleton } from '@/components/notice-refactor/board/BoardListSkeleton';

type SelectorCategory<T> = T extends T ? '전체' | T : never;

const categoryColors: { [category: string]: string } = {
  답변대기: 'text-gray-500',
  답변완료: 'text-primary',
} as const;

const ensureCategory = (str: string | null): SelectorCategory<SuggestCategory> => {
  if (str === '답변대기' || str === '답변완료') return str;
  return '전체';
};

const subtitle: JSX.Element = <p className="font-bold">학생자치기구에게 건의 및 문의할 수 있습니다.</p>;

export function SuggestPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') ?? '1') || 1;
  const category = ensureCategory(searchParams.get('category'));

  const boardType = '건의게시판';

  const [q] = useAtom(SearchState);

  const { data, isLoading, isError, error } = useSearchSugNoticePosts({
    q,
    page: page - 1,
    category: category === '전체' ? undefined : category,
  });

  if (isLoading) {
    return <BoardListSkeleton boardType={boardType} subtitle={subtitle} />;
  }

  if (!data || isError) {
    console.log(error);
    return (
      <div className="mt-16 flex items-center justify-center">
        <p>오류가 발생하였습니다. 관리자에게 문의하십시오.</p>
      </div>
    );
  }

  const { pageNum: currentPage, totalPages } = data.pageInfo;
  const posts = data.postListResDto;

  return (
    <>
      <BoardList
        boardType={boardType}
        subtitle={subtitle}
        totalPages={totalPages}
        currentPage={currentPage + 1}
        authorityList={data.allowedAuthorities}
        toWritepath="/sug-notice/edit"
        category={category}
        subcategories={['전체', '답변대기', '답변완료']}
        categoryColors={categoryColors}
        setSearchParams={setSearchParams}
        page={page}
        posts={posts}
        getCategory={(post) => post.category}
        getAuthor={(post) => post.author}
        getPostUrl={(post) => `/sug-notice/${post.postId}`}
      />
    </>
  );
}
