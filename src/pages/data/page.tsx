import { BodyLayout } from '@/template/BodyLayout';
import SortOptions from '@/pages/data/container/SortOptions.tsx';
import { HeadLayout } from '@/template/HeadLayout';
import { DataContentItem } from '@/pages/data/components/DataContentItem.tsx';
import { useNavigate, useSearchParams } from 'react-router';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { SearchState } from '@/recoil/atoms/atom';
import { BoardSelector } from '@/components/Board/BoardSelector';
import { useDataCategory } from './hook/utils/useDataCategory';
import { useSearchDataPosts } from '@/pages/data/hook/query/useSearchDataPost';

function PageSkeleton() {
  return (
    <>
      <HeadLayout title="자료집" />
      <BodyLayout.Skeleton>
        <BoardSelector.Skeleton />
        {Array.from(Array(10).keys()).map((_, i) => (
          <DataContentItem.Skeleton key={i} />
        ))}
      </BodyLayout.Skeleton>
    </>
  );
}

export default function DataPage() {
  /* Navigation function for write operation */
  const navigate = useNavigate();
  /* Obtain query parameters */
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') ?? '1') || 1;

  /* Search state management */
  // TODO: Use search parameters instead of recoil state
  const [q] = useRecoilState(SearchState);

  /* 카테고리 분류 */
  const { majorCategory, middleCategory, subCategory, setMajor, setMiddle, setSub } = useDataCategory();

  /* Load data from Query */
  const { data, isLoading, isError, error } = useSearchDataPosts({
    q,
    page: page - 1,
    majorCategory: majorCategory ?? '',
    middleCategory: middleCategory ?? '',
    subCategory: subCategory ?? '',
  });

  // check wrong page params
  useEffect(() => {
    if (data && (page < 1 || page > data.pageInfo.totalPages)) {
      setSearchParams((prev) => {
        prev.delete('page');
        return prev;
      });
    }
  }, [data, page, majorCategory, middleCategory, subCategory, setSearchParams]);

  if (isLoading) {
    return <PageSkeleton />;
  }

  if (!data || isError) {
    // TODO: 오류 발생 시 세부정보 제공
    console.log(error);
    return (
      <div className="mt-[120px] flex items-center justify-center">
        <p>오류가 발생하였습니다. 관리자에게 문의하십시오.</p>
      </div>
    );
  }

  /* Data preparation */
  const { pageNum: currentPage, totalPages } = data.pageInfo;
  const posts = data.postListResDto;

  return (
    <>
      <HeadLayout title="자료집"></HeadLayout>
      <SortOptions
        majorCategory={majorCategory || ''}
        middleCategory={middleCategory || ''}
        subCategory={subCategory || ''}
        onMajorChange={setMajor}
        onMiddleChange={setMiddle}
        onMinorChange={setSub}
      ></SortOptions>
      <BodyLayout
        totalPages={totalPages}
        currentPage={currentPage + 1}
        authority={data.allowedAuthorities}
        onPageChange={navigatePage}
        onWriteClick={navigateToWrite}
      >
        <div className="border-t-[0.063rem] border-t-black">
          {posts.map((post) => (
            <DataContentItem
              key={post.postId}
              to={`/data/${post.postId}`}
              date={post.date}
              title={post.title}
              content={post.content}
              isNotice={post.isNotice}
              files={post.files}
            />
          ))}
        </div>
        {posts.length === 0 && (
          <article className="flex items-center justify-center py-12">등록된 게시글이 없습니다.</article>
        )}
      </BodyLayout>
    </>
  );
  function navigatePage(page: number) {
    setSearchParams((prev) => {
      prev.set('page', `${page}`);
      return prev;
    });
    window.scrollTo(0, 0);
  }

  function navigateToWrite() {
    navigate('/data/edit');
  }
}
