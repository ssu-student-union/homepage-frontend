import { HeadLayout } from '@/template/HeadLayout';
import { ServiceNoticeTab } from './component/ServiceNoticeTab';
import { ServiceNoticePostContent } from './component/ServiceNoticePostContent';
import Pagination from '@/components/Pagination';

export function ServiceNoticePage() {

const onPageChange = (page: number) => {
  console.log(page);
};

  return (
    <>
      <div>
        <div className="mb-[-60px]">
          <ServiceNoticeTab Title="공지사항! 공지사항! 공지사항! 공지사항! 공지사항! 공지사항!" />
        </div>
        <HeadLayout title="서비스 공지사항" subtitle="홈페이지 개발자의 공지사항을 업로드합니다" searchHidden={true} />
        <div className="flex flex-col justify-center items-center mt-[64px] mb-[100px]">
          <ServiceNoticePostContent title='[점검] 서비스 공지사항 페이지 작업' date={'2020/10/25'} Emergency={true}/>
          <ServiceNoticePostContent title='[점검] 서비스 공지사항 페이지 작업' date={'2020/10/25'} Emergency={true}/>
          <ServiceNoticePostContent title='[점검] 서비스 공지사항 페이지 작업' date={'2020/10/25'} Emergency={false}/>
          <ServiceNoticePostContent title='[점검] 서비스 공지사항 페이지 작업' date={'2020/10/25'} Emergency={false}/>
          <ServiceNoticePostContent title='[점검] 서비스 공지사항 페이지 작업' date={'2020/10/25'} Emergency={false}/>
          <ServiceNoticePostContent title='[점검] 서비스 공지사항 페이지 작업' date={'2020/10/25'} Emergency={false}/>
          <ServiceNoticePostContent title='[점검] 서비스 공지사항 페이지 작업' date={'2020/10/25'} Emergency={false}/>
          <ServiceNoticePostContent title='[점검] 서비스 공지사항 페이지 작업' date={'2020/10/25'} Emergency={false}/>
          <ServiceNoticePostContent title='[점검] 서비스 공지사항 페이지 작업' date={'2020/10/25'} Emergency={false}/>
          <ServiceNoticePostContent title='[점검] 서비스 공지사항 페이지 작업' date={'2020/10/25'} Emergency={false}/>
        </div>
        <Pagination totalPages={1} currentPage={1} onPageChange={onPageChange}/>
      </div>
    </>
  );
}
