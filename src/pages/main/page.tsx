import { MainScheduleSection } from './containers/MainScheduleSection';
import MainCarousel from '@/components/MainCarousel';
import NoticeSection from './containers/NoticeSection';
import { Spacing } from '@/components/Spacing';
/* 기존 공약사업 기능 임시 제거 */
// import PetitionSection from './containers/PetitionSection';
// import LostArticleSection from './containers/LostArticleSection';
import CampusMapSection from './containers/CampusMapSection';
import { CounselBtn } from './containers/CounselBtn';
import { ServiceNoticeTab } from '../mypage/service-notice/component/ServiceNoticeTab';
import { useGetBoardPosts } from '@/hooks/api/get/useGetBoardPosts';
import { NoticeResponse } from '../notice/types';
import { MAIN_PENDING } from './const';
import QnaSection from './containers/QnaSection';
import { useResize } from '@/hooks/useResize';
import { Header } from '@/containers/common/Header/Header';
import { Footer } from '@/containers/common/Footer/Footer';
import { State } from '@/containers/common/Header/const/state';

export function MainPage() {
  const boardCode = '서비스공지사항';
  const { data, isLoading, isError } = useGetBoardPosts<NoticeResponse>({ boardCode, take: 1 });

  const firstNotice = data?.data.postListResDto[0];

  const { width } = useResize();

  return (
    <>
      <Header state={State.Login} />
      <main className="h-screen snap-y snap-mandatory overflow-y-scroll">
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

        <MainCarousel className="h-screen snap-start" id={MAIN_PENDING} />
        <MainScheduleSection className="snap-ceneter" id={MAIN_PENDING} />
        <CounselBtn />

        <div className="snap-start xs:px-[15px] sm:px-[15px] md:px-[3.125rem] lg:px-[12.5rem] xl:px-[12.5rem] xxl:px-[12.5rem]">
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
      </main>
      <Spacing size={202} direction="vertical" />
      <Footer />
    </>
  );
}
