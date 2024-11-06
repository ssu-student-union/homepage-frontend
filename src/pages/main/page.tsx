import { MainScheduleSection } from './containers/MainScheduleSection';
import MainCarousel from '@/components/MainCarousel';
import NoticeSection from './containers/NoticeSection';
import PetitionSection from './containers/PetitionSection';
import { Spacing } from '@/components/Spacing';
import LostArticleSection from './containers/LostArticleSection';
import CampusMapSection from './containers/CampusMapSection';
import { CounselBtn } from './containers/CounselBtn';

export function MainPage() {
  return (
    <>
      <main>
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
