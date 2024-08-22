import { MainScheduleSection } from './containers/MainScheduleSection';
import MainCarousel from '@/components/MainCarousel';
import NoticeSection from './containers/NoticeSection';
import PetitionSection from './containers/PetitionSection';
import { Spacing } from '@/components/Spacing';
import LostArticleSection from './containers/LostArticleSection';
import CampusMapSection from './containers/CampusMapSection';
import { Footer } from '@/containers/common/Footer/Footer';

export function MainPage() {
  return (
    <>
      <main>
        <MainCarousel />
        <MainScheduleSection />
        <div className="xs:pl-[3.125rem] sm:pl-[3.125rem] md:pl-[3.125rem] lg:px-[12.5rem] xl:px-[12.5rem] xxl:px-[12.5rem]">
          <Spacing size={86} direction="vertical" />
          <NoticeSection noticeCount={10} />
          <Spacing size={37} direction="vertical" />
          <Spacing size={88} direction="vertical" />
          <div className="flex w-full flex-col overflow-hidden xs:gap-[6.25rem] sm:gap-[8.75rem] md:gap-[8.75rem] lg:gap-[8.063rem] xl:gap-[8.063rem] xxl:flex-row xxl:gap-[9.625rem]">
            <PetitionSection />
            <LostArticleSection />
          </div>
          <Spacing size={129} direction="vertical" />
          <CampusMapSection />
        </div>
      </main>
      <Spacing size={202} direction="vertical" />
      <Footer />
    </>
  );
}
