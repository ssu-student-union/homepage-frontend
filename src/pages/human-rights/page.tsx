import { HeadLayout } from '@/template/HeadLayout.tsx';
import { BodyLayout } from '@/template/BodyLayout.tsx';
import { BoardSelector } from '@/components/Board/BoardSelector.tsx';
import { useState } from 'react';
import { PostContent } from '@/components/PostContent/PostContent.tsx';
import { ApiResponse, HumanRightsBoardPostsResponse, HumanRightsCategory } from '@/pages/human-rights/schema.ts';

type SelectorCategory<T> = T extends T ? '전체' | T : never;

/* Mock Data -- delete after impl api features */
const mockData: ApiResponse<HumanRightsBoardPostsResponse> = {
  code: '200',
  message: '성공',
  data: {
    postListResDto: [
      { postId: 0, title: '테스트', date: '2023/10/02', category: '접수대기', reportName: '테스트', author: false },
      { postId: 1, title: '테스트', date: '2023/10/02', category: '접수완료', reportName: '테스트', author: false },
      { postId: 2, title: '테스트', date: '2023/10/02', category: '접수대기', reportName: '테스트', author: false },
      { postId: 3, title: '테스트', date: '2023/10/02', category: '접수완료', reportName: '테스트', author: false },
      { postId: 4, title: '테스트', date: '2023/10/02', category: '접수대기', reportName: '테스트', author: false },
      { postId: 5, title: '테스트', date: '2023/10/02', category: '접수완료', reportName: '테스트', author: false },
    ],
    pageInfo: {
      pageNum: 1,
      pageSize: 10,
      totalElements: 6,
      totalPages: 1,
    },
    allowedAuthorities: [],
    deniedAuthorities: [],
  },
  isSuccess: true,
} as const;

const categoryColors: { [category: string]: string } = {
  접수대기: 'text-gray-500',
  접수완료: 'text-primary',
} as const;

export function HumanRightsPage() {
  /* States of page options */
  const [selectedCategory, setSelectedCategory] = useState<SelectorCategory<HumanRightsCategory>>('전체');

  /* Data preparation */
  const data: ApiResponse<HumanRightsBoardPostsResponse> = mockData;
  const { pageNum: currentPage, totalPages } = data.data.pageInfo;
  const posts = data.data.postListResDto.filter(
    (post) => selectedCategory == '전체' || selectedCategory == post.category
  );

  /* JSX Snippets */
  const subtitle = (
    <p className="font-bold">
      해당 게시판을 통해 신고해주신 내용은 <span className="text-primary">학생인권위원회</span>에서 접수 및 처리됩니다.
    </p>
  );

  return (
    <>
      <HeadLayout title="인권신고게시판" subtitle={subtitle}></HeadLayout>
      <BodyLayout
        totalPages={totalPages}
        currentPage={currentPage}
        authority={data.data.allowedAuthorities}
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
