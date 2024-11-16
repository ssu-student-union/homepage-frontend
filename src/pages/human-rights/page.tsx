import { HeadLayout } from '@/template/HeadLayout.tsx';
import { BodyLayout } from '@/template/BodyLayout.tsx';
import { BoardSelector } from '@/components/Board/BoardSelector.tsx';
import { PostContent } from '@/components/PostContent/PostContent.tsx';
import { HumanRightsCategory } from '@/pages/human-rights/schema.ts';
import { useMockGetHumanRightsPosts } from '@/pages/human-rights/mockQueries.ts';
import { useNavigate, useSearchParams } from 'react-router-dom';

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
  const page = parseInt(searchParams.get('page') ?? '0') || 0;
  const category = ensureCategory(searchParams.get('category'));

  /* Load data from Query */
  const { data: postsData, isLoading, isError } = useMockGetHumanRightsPosts({ page, category, delay: 10000 });

  if (isLoading) {
    return <PageSkeleton />;
  }

  if (!postsData || isError) {
    // TODO: 오류 발생 시 세부정보 제공
    return (
      <div className="mt-[120px] flex items-center justify-center">
        <p>오류가 발생하였습니다. 관리자에게 문의하십시오.</p>
      </div>
    );
  }

  /* Data preparation */
  const data = postsData.data;
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
        currentPage={currentPage}
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
            href={`/human-rights/${post.postId}`}
            category={{ name: post.category, className: categoryColors[post.category] }}
            date={new Date(post.date)}
            title={post.title}
            author={post.reportName}
          />
        ))}
      </BodyLayout>
    </>
  );
}
