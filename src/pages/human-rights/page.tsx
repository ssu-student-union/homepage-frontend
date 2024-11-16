import { HeadLayout } from '@/template/HeadLayout.tsx';
import { BodyLayout } from '@/template/BodyLayout.tsx';
import { BoardSelector } from '@/components/Board/BoardSelector.tsx';
import { useState } from 'react';
import { PostContent } from '@/components/PostContent/PostContent.tsx';
import { HumanRightsCategory } from '@/pages/human-rights/schema.ts';
import { useMockGetHumanRightsPosts } from '@/pages/human-rights/mockQueries.ts';

type SelectorCategory<T> = T extends T ? '전체' | T : never;

const categoryColors: { [category: string]: string } = {
  접수대기: 'text-gray-500',
  접수완료: 'text-primary',
} as const;

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
  /* States of page options */
  const [selectedCategory, setSelectedCategory] = useState<SelectorCategory<HumanRightsCategory>>('전체');

  /* Load data from Query */
  const { data: postsData, isLoading, isError } = useMockGetHumanRightsPosts({ delay: 10000 });

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
  const posts = data.postListResDto.filter((post) => selectedCategory == '전체' || selectedCategory == post.category);

  return (
    <>
      <HeadLayout title="인권신고게시판" subtitle={subtitle}></HeadLayout>
      <BodyLayout
        totalPages={totalPages}
        currentPage={currentPage}
        authority={data.allowedAuthorities}
        onPageChange={() => {}}
        onWriteClick={() => {}}
      >
        <BoardSelector
          subcategories={['전체', '접수대기', '접수완료']}
          selectedSubcategory={selectedCategory}
          onSubcategorySelect={(category: SelectorCategory<HumanRightsCategory>) => setSelectedCategory(category)}
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
