import { MainScheduleSection } from './containers/MainScheduleSection';
import MainCarousel from '@/components/MainCarousel';
import NoticeSection from './containers/NoticeSection';
import PetitionSection from './containers/PetitionSection';
import { Spacing } from '@/components/Spacing';
import LostArticleSection from './containers/LostArticleSection';
import CampusMapSection from './containers/CampusMapSection';
import { CounselBtn } from './containers/CounselBtn';
import { ServiceNoticeTab } from '../mypage/service-notice/component/ServiceNoticeTab';
import { useGetBoardPosts } from '@/hooks/api/get/useGetBoardPosts';
import { NoticeResponse } from '../notice/types';

export function MainPage() {
  const boardCode = '서비스공지사항';
  const { data } = useGetBoardPosts<NoticeResponse>({ boardCode, take: 1 });
  const firstNotice = data?.data.postListResDto[0];
  return (
    <>
      <main>
        {!!firstNotice ? (
          <ServiceNoticeTab
            isEmergency={firstNotice?.status === '긴급공지'}
            Title={firstNotice?.title}
            postId={firstNotice?.postId}
          />
        ) : (
          ''
        )}
        <MainCarousel />
        <MainScheduleSection />
        <CounselBtn />

        <div className="xs:pl-[3.125rem] sm:pl-[3.125rem] md:pl-[3.125rem] lg:px-[12.5rem] xl:px-[12.5rem] xxl:px-[12.5rem]">
          <Spacing size={86} direction="vertical" />
          <NoticeSection />
          <Spacing size={37} direction="vertical" />
          <Spacing size={88} direction="vertical" />
          <div className="w-full flex-col space-y-5 overflow-hidden">
            <PetitionSection />
            <LostArticleSection />
          </div>
          <Spacing size={129} direction="vertical" />
          <CampusMapSection />
        </div>
      </main>
      <Spacing size={202} direction="vertical" />
    </>
  );
}
