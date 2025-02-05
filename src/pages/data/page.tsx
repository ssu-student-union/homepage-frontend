import { BodyLayout } from '@/template/BodyLayout';
import SortLayout from '@/pages/data/container/SortLayout';
import { HeadLayout } from '@/template/HeadLayout';
import { DataContent } from '@/pages/data/components/DataContent';
import { data } from '@/pages/data/const/mockupData';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function DataPage() {
  const posts = data.postListResDto;
  const totalPage = data.pageInfo.totalPages;
  const currentPage = data.pageInfo.pageNum;

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') ?? '1') || 1;
  console.log(page);

  return (
    <>
      <HeadLayout title="자료집"></HeadLayout>
      <SortLayout></SortLayout>
      <BodyLayout
        totalPages={totalPage}
        currentPage={currentPage + 1}
        onPageChange={navigatePage}
        onWriteClick={navigateToWrite}
      >
        <div className="border-t-[0.063rem] border-t-black">
          {' '}
          {posts.map((post) => (
            <DataContent
              key={post.postId}
              to={`/data/${post.postId}`}
              category={post.category}
              date={post.date}
              title={post.title}
              content={post.content}
              isNotice={post.isNotice}
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
