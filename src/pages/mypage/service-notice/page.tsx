import { HeadLayout } from '@/template/HeadLayout';
import { ServiceNoticeTab } from './component/ServiceNoticeTab';
import { ServiceNoticePostContent } from './component/ServiceNoticePostContent';

export function ServiceNoticePage() {
  return (
    <>
      <div>
        <div className="mb-[-60px]">
          <ServiceNoticeTab Title="공지사항! 공지사항! 공지사항! 공지사항! 공지사항! 공지사항!" />
        </div>
        <HeadLayout title="서비스 공지사항" subtitle="홈페이지 개발자의 공지사항을 업로드합니다" searchHidden={true} />
        <div className="flex flex-col justify-center items-center mt-[64px]">
          <ServiceNoticePostContent />
          <ServiceNoticePostContent />
          <ServiceNoticePostContent />
          <ServiceNoticePostContent />
          <ServiceNoticePostContent />
          <ServiceNoticePostContent />
          <ServiceNoticePostContent />
        </div>
      </div>
    </>
  );
}
