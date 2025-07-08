import { ServiceNoticePostContent } from './component/ServiceNoticePostContent';
import { Link } from 'react-router';
import { cn } from '@/libs/utils';
import { useServiceNoticeBoard } from './hooks/useServiceNoticeBoard';
import dayjs from 'dayjs';
import { BoardHeader } from '@/components/BoardHeader';
import { Container } from '@/containers/new/Container';
import { ArticleFooter } from '@/containers/new/ArticleFooter';
import LinkPagination from '@/components/LinkPagination';
import { Pencil } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
export function ServiceNoticePage() {
  const boardCode = '서비스공지사항';
  const { idata, totalPages, currentPage, isLoading } = useServiceNoticeBoard(boardCode);
  const data = idata?.data.postListResDto;

  return (
    <>
      <BoardHeader
        title="서비스 공지사항"
        subtitle="홈페이지 개발자의 공지사항을 업로드합니다"
        className="border-b-neutral-200 max-md:px-5 md:border-b"
      />
      <Container className="pt-0 max-md:px-0 md:pt-14">
        {isLoading ? (
          <div className={cn(`flex w-full flex-col flex-wrap gap-[10px]`)}>
            {Array.from({ length: 7 }).map((_, index) => (
              <ServiceNoticePostContent.Skeleton key={index} />
            ))}
          </div>
        ) : (
          data?.map((data) => (
            <ServiceNoticePostContent
              key={data.postId}
              postId={data.postId.toString()}
              title={data.title}
              date={dayjs(data.date).format('YYYY-MM-DD')}
              Emergency={data.status === '긴급공지'}
            />
          ))
        )}
      </Container>
      <ArticleFooter className="mb-20">
        <div className="flex flex-col gap-9">
          <div className="grid grid-cols-3">
            <div></div>
            <div className="flex justify-center">
              <LinkPagination totalPages={totalPages} maxDisplay={7} page={currentPage} />
            </div>
            <div className="flex justify-end">
              {idata?.data.allowedAuthorities?.includes('WRITE') && (
                <Link className={cn(buttonVariants({ variant: 'outline' }), 'gap-2')} to="/data/edit">
                  <Pencil className="size-4" />
                  <p>글쓰기</p>
                </Link>
              )}
            </div>
          </div>
        </div>
      </ArticleFooter>
    </>
  );
}
