import { useState } from 'react';
import UserContainer from '../component/UserContainer';
import { MyPostsContent } from './myPostsContent/myPostsContent';
import { useGetUserPosts } from './hooks/useGetUserPosts';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSearchUserPosts } from './hooks/useSearchUserPosts';
import { Skeleton } from '@/components/ui/skeleton';
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
  const [page, setPage] = useState(0);
  const [take] = useState(6);
  const [searchText, setSearchText] = useState('');
  const [query, setQuery] = useState('');

  const userPostsData = useGetUserPosts(page, take);
  const searchData = useSearchUserPosts(page, take, query);

  const data = query ? searchData.data : userPostsData.data;
  const isLoading = query ? searchData.isLoading : userPostsData.isLoading;
  const error = query ? searchData.error : userPostsData.error;

  const totalPages = data?.pageInfo?.totalPages ?? 1;

  const onClickSearch = () => {
    console.log(searchText);
    setPage(0);
    setQuery(searchText);
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
      <div className="flex flex-col">
        <UserContainer />
        <div>
          <div className="mx-16 flex items-center border-b-[1px] border-solid border-gray-500 pb-1">
            <span className="pl-2">작성 글</span>
            <Skeleton className="ml-2 h-4 w-5" />
          </div>
          <PostsLoadingSkeleton />
        </div>
      </div>
    );
  }

  if (error || !data) {
    console.log('error : ', error);
    return null;
  }

  return (
    <div className="flex flex-col">
      <UserContainer />
      <div>
        <div className="mx-16 flex items-center border-b-[1px] border-solid border-gray-500 pb-1">
          <span className="pl-2">작성 글</span>
          <span className="ml-2 text-center font-semibold">{data.pageInfo.totalElements}</span>
        </div>
        {data.postListResDto.map((post) => (
          <MyPostsContent key={post.postId} data={post} />
        ))}
      </div>
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
      {/* <Pagination totalPages={totalPages} currentPage={page} onPageChange={handlePageClick} /> */}
      <div className="mb-16 flex justify-center gap-3">
        <Input
          type="text"
          onChange={(e: { target: { value: string } }) => setSearchText(e.target.value)}
          className="w-56 rounded-md border border-gray-300 p-3 text-xs md:w-80"
          placeholder="원하시는 키워드를 입력하세요"
        />
        <Button
          onClick={onClickSearch}
          className="h-12 rounded-md bg-[#2F4BF7] px-7 text-[13px] text-white xs:px-4 sm:px-5"
        >
          검색
        </Button>
      </div>
    </div>
  );
}

export default MyPostsPage;
