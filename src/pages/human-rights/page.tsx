import { HeadLayout } from '@/template/HeadLayout.tsx';
import { BodyLayout } from '@/template/BodyLayout.tsx';
import { BoardSelector } from '@/components/Board/BoardSelector.tsx';
import { PostContent } from '@/components/PostContent/PostContent.tsx';
import { HumanRightsCategory } from '@/pages/human-rights/schema.ts';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { SearchState } from '@/recoil/atoms/atom.ts';
import { useSearchHumanRightsPosts } from '@/pages/human-rights/queries.ts';
import { useEffect } from 'react';

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

function PageSkeleton() {
  return (
    <>
      <HeadLayout title="인권신고게시판" subtitle={subtitle} searchHidden={true} />
      <BodyLayout.Skeleton>
        <BoardSelector.Skeleton />
        {Array.from(Array(10).keys()).map((_, i) => (
          <PostContent.Skeleton key={i} />
        ))}
      </BodyLayout.Skeleton>
    </>
  );
}

export function HumanRightsPage() {
  /* Navigation function for write operation */
  const navigate = useNavigate();
  /* Obtain query parameters */
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') ?? '1') || 1;
  const category = ensureCategory(searchParams.get('category'));

  /* Search state management */
  // TODO: Use search parameters instead of recoil state
  const [q] = useRecoilState(SearchState);

  /* Load data from Query */
  const { data, isLoading, isError } = useSearchHumanRightsPosts({
    q,
    page: page - 1,
    category: category === '전체' ? undefined : category,
  });

  // check wrong page params
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
    // TODO: 오류 발생 시 세부정보 제공
    return (
      <div className="mt-[120px] flex items-center justify-center">
        <p>오류가 발생하였습니다. 관리자에게 문의하십시오.</p>
      </div>
    );
  }

  /* Data preparation */
  const { pageNum: currentPage, totalPages } = data.pageInfo;
  const posts = data.postListResDto;

  /* Handle user inputs */
  function selectCategory(category: SelectorCategory<HumanRightsCategory>) {
    setSearchParams((prev) => {
      if (category === '전체') {
        prev.delete('category');
      } else {
        prev.set('category', category);
      }
      prev.delete('page');
      return prev;
    });
  }

  function navigatePage(page: number) {
    setSearchParams((prev) => {
      prev.set('page', `${page}`);
      return prev;
    });
  }

  function navigateToWrite() {
    navigate('/human-rights/edit');
  }

  return (
    <>
      <HeadLayout title="인권신고게시판" subtitle={subtitle}></HeadLayout>
      <BodyLayout
        totalPages={totalPages}
        currentPage={currentPage + 1}
        authority={data.allowedAuthorities}
        onPageChange={navigatePage}
        onWriteClick={navigateToWrite}
      >
        <BoardSelector
          subcategories={['전체', '접수대기', '접수완료']}
          selectedSubcategory={category}
          onSubcategorySelect={selectCategory}
          className="mb-4"
        />
        {posts.map((post) => (
          <PostContent<HumanRightsCategory>
            key={post.postId}
            to={`/human-rights/${post.postId}`}
            category={{ name: post.category, className: categoryColors[post.category] }}
            date={new Date(post.date)}
            title={post.title}
            author={post.reportName}
          />
        ))}
        {posts.length === 0 && (
          <article className="flex items-center justify-center py-12">등록된 게시글이 없습니다.</article>
        )}
      </BodyLayout>
    </>
  );
}
