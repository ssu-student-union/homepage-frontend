import { useEffect, useState } from 'react';
import { MyPostsContent } from './myPostsContent/myPostsContent';
import { useGetUserPosts } from './hooks/useGetUserPosts';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSearchUserPosts } from './hooks/useSearchUserPosts';
import { Skeleton } from '@/components/ui/skeleton';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router';
// import Pagination from '@/components/Pagination';

const PostSkeleton = () => (
  <div className="mx-16 my-4 border-b border-gray-200 p-4">
    <div className="flex items-start gap-4">
      <Skeleton className="h-5 w-14" />
      <Skeleton className="h-5 w-4/5" />
      <div className="flex-col space-y-2">
        <Skeleton className="h-5 w-10" />
        <Skeleton className="h-4 w-10" />
      </div>
    </div>
  </div>
);

const PostsLoadingSkeleton = () => {
  return (
    <>
      {[...Array(6)].map((_, index) => (
        <PostSkeleton key={index} />
      ))}
    </>
  );
};

function MyPostsPage() {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(0);
  const [searchText, setSearchText] = useState(searchParams.get('search') ?? '');
  const query = searchParams.get('search') ?? '';

  useEffect(() => {
    if (!searchParams.get('search')) {
      setSearchText('');
    }
  }, [searchParams]);

  const userPostsData = useGetUserPosts(page, 6, { enabled: !query && !searchText });
  const searchData = useSearchUserPosts(page, 6, query, { enabled: !!query });

  const fetchedData = query ? searchData.data : userPostsData.data;
  const isLoading = query ? searchData.isLoading : userPostsData.isLoading;
  const error = query ? searchData.error : userPostsData.error;

  const totalPages = fetchedData?.pageInfo?.totalPages ?? 1;

  const onClickSearch = () => {
    console.log('searchText : ', searchText);
    setPage(0);
    setSearchParams({ selectedMenu: 'myPosts', search: searchText });
  };

  const handlePageClick = (pageNumber: number) => {
    setPage(pageNumber);
  };

  const getPaginationRange = () => {
    const totalPagesToShow = 6;
    const startPage = Math.max(0, page - Math.floor(totalPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + totalPagesToShow);
    return Array.from({ length: endPage - startPage }, (_, i) => startPage + i);
  };

  if (isLoading) {
    return (
      <div>
        <div className="mx-16 flex items-center border-b border-solid border-gray-500 pb-1">
          <span className="pl-2">{t('mypage.작성 글')}</span>
          <Skeleton className="ml-2 h-4 w-5" />
        </div>
        <PostsLoadingSkeleton />
      </div>
    );
  }

  if (error || !fetchedData) {
    console.log('error : ', error);
    return <div className="p-20">오류가 발생하였습니다.</div>;
  }

  console.log('fetchedData : ', fetchedData);

  return (
    <>
      <div>
        <div className="mx-16 flex items-center border-b border-solid border-gray-500 pb-1">
          <span className="pl-2">{t('mypage.작성 글')}</span>
          <span className="ml-2 text-center font-semibold">{fetchedData.pageInfo.totalElements}</span>
          <img
            src="/image/mypage/arrowClockwise.svg"
            alt="arrowClockWise"
            className="ml-2 size-4 cursor-pointer md:size-5"
            onClick={() => {
              setSearchParams({ selectedMenu: 'myPosts' });
              setSearchText('');
              setPage(0);
            }}
          />
        </div>
        {!fetchedData.postListResDto.length ? (
          <div className="flex justify-center py-20 text-gray-700">{t('mypage.게시글이 존재하지 않습니다.')}</div>
        ) : (
          fetchedData.postListResDto.map((post) => <MyPostsContent key={post.postId} data={post} />)
        )}
      </div>
      {fetchedData.postListResDto.length > 0 && (
        <div className="mb-6 mt-14 flex items-center justify-center text-sm">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
            disabled={page === 0}
            className="border-none px-3 py-1 text-gray-700 disabled:opacity-30"
          >
            &lt;
          </button>

          {getPaginationRange().map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => handlePageClick(pageNumber)}
              className={`rounded-sm border-none px-3 py-1 text-gray-700 ${page === pageNumber ? 'bg-gray-200' : 'bg-white'}`}
            >
              {pageNumber + 1}
            </button>
          ))}

          <button
            onClick={() => setPage((prev) => (prev + 1 < totalPages ? prev + 1 : prev))}
            disabled={page + 1 >= totalPages}
            className="border-none px-3 py-1 text-gray-700 disabled:opacity-30"
          >
            &gt;
          </button>
        </div>
      )}
      {/* <Pagination totalPages={totalPages} currentPage={page} onPageChange={handlePageClick} /> */}
      <div className="mb-16 flex justify-center gap-3">
        <Input
          type="text"
          value={searchText}
          onChange={(e: { target: { value: string } }) => setSearchText(e.target.value)}
          className="w-56 rounded-md border border-gray-300 p-3 text-xs md:w-80"
          placeholder={t('mypage.원하시는 키워드를 입력하세요')}
        />
        <Button onClick={onClickSearch} className="h-12 rounded-md bg-[#2F4BF7] px-4 text-[13px] text-white sm:px-5">
          {t('mypage.검색')}
        </Button>
      </div>
    </>
  );
}

export default MyPostsPage;
