import { HeadLayout } from '@/template/HeadLayout';
import { ServiceNoticePostContent } from './component/ServiceNoticePostContent';
import Pagination from '@/components/deprecated/Pagination';
import { WriteButton } from '@/components/deprecated/Buttons/BoardActionButtons';
import { useNavigate } from 'react-router';
import { useContentWidth } from './hooks/useContetnWidth';
import { cn } from '@/libs/utils';
import { useServiceNoticeBoard } from './hooks/useServiceNoticeBoard';
import dayjs from 'dayjs';

export function ServiceNoticePage() {
  const contentWidth = useContentWidth();

  const boardCode = '서비스공지사항';
  const { idata, totalPages, currentPage, handlePageChange, isLoading } = useServiceNoticeBoard(boardCode);
  const data = idata?.data.postListResDto;
  const navigate = useNavigate();

  const handleWriteBtnClick = () => {
    navigate('/service-notice/edit');
  };

  const MobileWriteBtn = contentWidth === 316 ? 'justify-center' : 'justify-end';

  return (
    <>
      <div className="mb-[310px]">
        <div>
          <HeadLayout
            title="서비스 공지사항"
            subtitle="홈페이지 개발자의 공지사항을 업로드합니다"
            searchHidden={true}
          />
        </div>
        {/* 로딩 상태에 따라 Skeleton 또는 실제 데이터를 표시 */}
        <div className="flex flex-col items-center justify-center">
          {isLoading ? (
            <div className="mb-[300px] mt-[64px] flex w-full flex-col items-center">
              <div className={cn(`flex w-full flex-col flex-wrap gap-[10px]`)}>
                {Array.from({ length: 7 }).map((_, index) => (
                  <ServiceNoticePostContent.Skeleton key={index} />
                ))}
              </div>
            </div>
          ) : (
            <>
              <div className="mb-[40px] mt-[64px] flex flex-col items-center justify-center">
                {data?.map((data) => (
                  <ServiceNoticePostContent
                    key={data.postId}
                    postId={data.postId.toString()}
                    title={data.title}
                    date={dayjs(data.date).format('YYYY-MM-DD')}
                    Emergency={data.status === '긴급공지'}
                  />
                ))}
              </div>
              <div className={`mb-[40px] flex ${MobileWriteBtn}`} style={{ width: `${contentWidth}px` }}>
                <div onClick={handleWriteBtnClick}>
                  {idata?.data.allowedAuthorities?.includes('WRITE') ? (
                    <WriteButton onClick={handleWriteBtnClick} />
                  ) : null}
                </div>
              </div>
              <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
            </>
          )}
        </div>
      </div>
    </>
  );
}
