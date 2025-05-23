import { HeadLayout } from '@/template/HeadLayout';
import { BodyLayout } from '@/template/BodyLayout';
import { BoardSelector } from '@/components/deprecated/Board/BoardSelector';
import { PostContent } from '@/components/PostContent';
import { SuggestCategory } from './schema';
import { useNavigate, useSearchParams } from 'react-router';
import { SearchState } from '@/atoms/atom';
import { useSearchSugNoticePosts } from './queries';
import { useEffect } from 'react';
import { useAtom } from 'jotai';

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

function PageSkeleton() {
  return (
    <div>
      <HeadLayout title="건의게시판" subtitle={subtitle} searchHidden={true} />
      <BodyLayout.Skeleton>
        <BoardSelector.Skeleton />
        {Array.from(Array(10).keys()).map((_, i) => (
          <PostContent.Skeleton key={i} />
        ))}
      </BodyLayout.Skeleton>
    </div>
  );
}

// const data = {
//   postListResDto: [],
//   allowedAuthorities: [],
//   deniedAuthorities: ['WRITE', 'ALL_READ'],
//   pageInfo: {
//     pageNum: 0,
//     pageSize: 15,
//     totalElements: 0,
//     totalPages: 0,
//   },
// };

export function SuggestPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') ?? '1') || 1;
  const category = ensureCategory(searchParams.get('category'));

  // 검색 데이터 불러오는 API 추가 예정

  const [q] = useAtom(SearchState);

  const { data, isLoading, isError, error } = useSearchSugNoticePosts({
    q,
    page: page - 1,
    category: category === '전체' ? undefined : category,
  });

  useEffect(() => {
    if (data && (page < 1 || page > data.pageInfo.totalPages)) {
      setSearchParams((prev) => {
        prev.delete('page');
        return prev;
      });
    }
  }, [data, page, setSearchParams]);

  if (isLoading) {
    return <PageSkeleton />;
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

  function selectCategory(category: SelectorCategory<SuggestCategory>) {
    setSearchParams((prev) => {
      if (category === '전체') {
        prev.delete('category');
      } else {
        prev.set('category', category);
      }
      prev.delete('page');
      return prev;
    });
    window.scrollTo(0, 0);
  }

  function navigatePage(page: number) {
    setSearchParams((prev) => {
      prev.set('page', `${page}`);
      return prev;
    });
    window.scrollTo(0, 0);
  }

  function navigateToWrite() {
    navigate('/sug-notice/edit');
  }

  return (
    <>
      <HeadLayout title="건의게시판" subtitle={subtitle} />
      <BodyLayout
        totalPages={totalPages}
        currentPage={currentPage + 1}
        authority={data.allowedAuthorities}
        onPageChange={navigatePage}
        onWriteClick={navigateToWrite}
      >
        <BoardSelector
          subcategories={['전체', '답변대기', '답변완료']}
          selectedSubcategory={category}
          onSubcategorySelect={selectCategory}
          className="mb-4"
        />
        {posts.map((post) => (
          <PostContent<SuggestCategory>
            key={post.postId}
            to={`/sug-notice/${post.postId}`}
            category={{ name: post.category, className: categoryColors[post.category] }}
            date={post.date}
            title={post.title}
            author={post.author}
          />
        ))}
        {posts.length === 0 && (
          <article className="flex items-center justify-center py-12">등록된 게시글이 없습니다.</article>
        )}
      </BodyLayout>
    </>
  );
}
