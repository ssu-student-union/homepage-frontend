import { HeadLayout } from '@/template/HeadLayout';
import { ServiceNoticeTab } from './component/ServiceNoticeTab';
import { ServiceNoticePostContent } from './component/ServiceNoticePostContent';
import Pagination from '@/components/Pagination';
import { WriteButton } from '@/components/Buttons/BoardActionButtons';
import { useNavigate } from 'react-router-dom';
import { useContentWidth } from './hooks/useContetnWidth';
//import { ServiceNoticeData } from './MockData';
import { useEffect } from 'react';
import { cn } from '@/libs/utils';
import { useServiceNoticeBoard } from './hooks/useServiceNoticeBoard';
import dayjs from 'dayjs';

// type Post = {
//   postId: number;
//   title: string;
//   content: string;
//   date: string;
//   category: null;
//   thumbNail: string | null;
//   status: string;
//   author: string;
// };

export function ServiceNoticePage() {
  //const [currentPage, setCurrentPage] = useState(1);
  //const [loading, setLoading] = useState(true);
  //const [data, setData] = useState<Post[] | null>(null);
  //const postsPerPage = 10;
  const contentWidth = useContentWidth();

  const boardCode = "서비스공지사항";
  const {idata, totalPages, currentPage, handlePageChange, isLoading } = useServiceNoticeBoard(
    boardCode
  );
  const data = idata?.data.postListResDto;
  useEffect(() => {
    console.log(idata?.data.postListResDto);
  }, [idata]);

  const firstNotice = idata?.data.postListResDto[0];

  // const onPageChange = (page: number) => {
  //   setCurrentPage(page);
  // };

  const navigate = useNavigate();

  const handleWriteBtnClick = () => {
    navigate('/service-notice/edit');
  };

  /*api 연동 전 MockData로 Loading 스켈레톤 처리 테스트 입니다.*/
  // useEffect(() => {
  //   // Mock 데이터 로딩 시뮬레이션
  //   setLoading(true); // 로딩 시작
  //   setTimeout(() => {
  //     setData(ServiceNoticeData?.data?.postListResDto); // 데이터 설정
  //     setLoading(false); // 로딩 완료
  //   }, 1000); // 1초 딜레이로 비동기 동작 흉내
  // }, []);

  // const startIndex = (currentPage - 1) * postsPerPage;
  // const selectedPosts = data?.slice(startIndex, startIndex + postsPerPage);

  const MobileWriteBtn = contentWidth === 316 ? 'justify-center' : 'justify-end';

  return (
    <>
      <div className="mb-[310px]">
        <div className="">
          <ServiceNoticeTab isEmergency={firstNotice?.status === '긴급공지'} Title={firstNotice?.title} postId={firstNotice?.postId}/>
        </div>
        <div className="mt-[160px]">
          <HeadLayout
            title="서비스 공지사항"
            subtitle="홈페이지 개발자의 공지사항을 업로드합니다"
            searchHidden={true}
          />
        </div>
        {/* 로딩 상태에 따라 Skeleton 또는 실제 데이터를 표시 */}
        <div className="jutify-center flex flex-col items-center">
          {isLoading ? (
            <div className="mb-[300px] mt-[64px] flex flex-col items-center">
              <div className={cn(`flex flex-col flex-wrap gap-[10px]`)}>
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
                    date={dayjs(data.date).format("YYYY-MM-DD")}
                    Emergency={data.status === '긴급공지'}
                  />
                ))}
              </div>
              <div
                className={`mb-[40px] flex ${MobileWriteBtn}`}
                style={{ width: `${contentWidth}px` }}
              >
                <div onClick={handleWriteBtnClick}>
                {idata?.data.allowedAuthorities?.includes('WRITE') ? <WriteButton onClick={handleWriteBtnClick} /> : null}
                </div>
              </div>
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}
