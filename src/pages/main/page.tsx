import { MainScheduleSection } from './containers/MainScheduleSection';
import MainCarousel from '@/pages/main/containers/MainCarousel';
import NoticeSection from './containers/NoticeSection';
import { Spacing } from '@/components/Spacing';
/* 기존 공약사업 기능 임시 제거 */
// import PetitionSection from './containers/PetitionSection';
// import LostArticleSection from './containers/LostArticleSection';
import CampusMapSection from './containers/CampusMapSection';
import { FloatingButtons } from './containers/FloatingButtons';
import { ServiceNoticeTab } from '../mypage/service-notice/component/ServiceNoticeTab';
import { useGetBoardPosts } from '@/hooks/deprecated/get/useGetBoardPosts';
import { NoticeResponse } from '../notice/types';
import { MAIN_PENDING } from './const';
import QnaSection from './containers/QnaSection';
import { useResize } from '@/hooks/useResize';

export function MainPage() {
  const boardCode = '서비스공지사항';
  const { data, isLoading, isError } = useGetBoardPosts<NoticeResponse>({ boardCode, take: 1 });

  const firstNotice = data?.data.postListResDto[0];

  const { width } = useResize();

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center">
          <ServiceNoticeTab.Skeleton />
        </div>
      ) : isError ? (
        <div className="flex items-center justify-center">
          <p>에러가 발생했습니다. 잠시 후 다시 시도해주세요.</p>
        </div>
      ) : firstNotice ? (
        <ServiceNoticeTab
          isEmergency={firstNotice.status === '긴급공지'}
          title={firstNotice?.title}
          postId={firstNotice?.postId}
        />
      ) : null}

      <MainCarousel className="h-screen" id={MAIN_PENDING} />
      <MainScheduleSection id={MAIN_PENDING} />
      <FloatingButtons />

      <div className="snap-start px-[15px] md:px-[3.125rem] lg:px-[12.5rem]">
        <Spacing size={86} direction="vertical" />
        <QnaSection />
        <Spacing size={width >= 720 ? 142 : 82} direction="vertical" />
        <NoticeSection />
        <Spacing size={width >= 720 ? 142 : 82} direction="vertical" />
        {/* 기존 공약사업 기능 임시 제거 */}
        {/* <div className="인기청원 분실물 w-full flex-col space-y-5 overflow-hidden">
            <PetitionSection />
            <LostArticleSection />
          </div> */}
        <CampusMapSection />
      </div>
      <Spacing size={202} direction="vertical" />
    </>
  );
}
