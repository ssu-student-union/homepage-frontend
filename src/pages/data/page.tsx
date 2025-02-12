import { BodyLayout } from '@/template/BodyLayout';
import SortLayout from '@/pages/data/container/SortLayout';
import { HeadLayout } from '@/template/HeadLayout';
import { DataContent } from '@/pages/data/components/DataContent';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useSearchDataPost } from '@/pages/data/queries';
import { useRecoilState } from 'recoil';
import { SearchState } from '@/recoil/atoms/atom';
import { BoardSelector } from '@/components/Board/BoardSelector';

function PageSkeleton() {
  return (
    <>
      <HeadLayout title="자료집집" />
      <BodyLayout.Skeleton>
        <BoardSelector.Skeleton />
        {Array.from(Array(10).keys()).map((_, i) => (
          <DataContent.Skeleton key={i} />
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

  /* Load data from Query */
  const { data, isLoading, isError, error } = useSearchDataPost({
    q,
    page: page - 1,
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

  console.log(posts);

  return (
    <>
      <HeadLayout title="자료집"></HeadLayout>
      <SortLayout></SortLayout>
      <BodyLayout
        totalPages={totalPages}
        currentPage={currentPage + 1}
        onPageChange={navigatePage}
        onWriteClick={navigateToWrite}
      >
        <div className="border-t-[0.063rem] border-t-black">
          {posts.map((post) => (
            <DataContent
              key={post.postId}
              to={`/data/${post.postId}`}
              category={post.category}
              date={post.date}
              title={post.title}
              content={post.content}
              isNotice={post.isNotice}
              files={post.files}
            />
          ))}
        </div>
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
