import { HeadLayout } from '@/template/HeadLayout';
import { ServiceNoticeTab } from './component/ServiceNoticeTab';
import { ServiceNoticePostContent } from './component/ServiceNoticePostContent';
import Pagination from '@/components/Pagination';
import { WriteButton } from '@/components/Buttons/BoardActionButtons';
import { useNavigate } from 'react-router-dom';
import { useContentWidth } from './hook/useContetnWidth';
import { ServiceNoticeData } from './MockData';
import { useState } from 'react';

export function ServiceNoticePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;
  const contentWidth = useContentWidth();
  // const onPageChange = (page: number) => {
  //   console.log(page);
  // };

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const navigate = useNavigate();

  const handleWriteBtnClick = () => {
    navigate('/service-notice/edit');
  };

  const startIndex = (currentPage - 1) * postsPerPage;
  const selectedPosts = ServiceNoticeData.data.postListResDto.slice(startIndex, startIndex + postsPerPage);

  const MobileWriteBtn = contentWidth === 316 ? 'justify-center' : 'justify-end';

  return (
    <>
      <div className="mb-[310px]">
        <div className="">
          <ServiceNoticeTab Title="[점검] 총학생회 홈페이지 점검으로 인한 기능 제한" />
        </div>
        <div className="mt-[160px]">
          <HeadLayout
            title="서비스 공지사항"
            subtitle="홈페이지 개발자의 공지사항을 업로드합니다"
            searchHidden={true}
          />
        </div>
        <div className="jutify-center flex flex-col items-center">
          <div className="mb-[40px] mt-[64px] flex flex-col items-center justify-center">
            {selectedPosts.map((data) => {
              return (
                <ServiceNoticePostContent
                  key={data.postId}
                  postId={data.postId.toString()}
                  title={data.title}
                  date={data.date}
                  Emergency={data.status === '긴급공지'}
                />
              );
            })}
          </div>
          <div
            className={`mb-[40px] flex ${MobileWriteBtn}`}
            style={{ width: `${contentWidth}px` }}
            onClick={handleWriteBtnClick}
          >
            <WriteButton />
          </div>
          <Pagination
            totalPages={ServiceNoticeData.data.pageInfo.totalPages}
            currentPage={currentPage}
            onPageChange={onPageChange}
          />
        </div>
      </div>
    </>
  );
}
