import { MainScheduleSection } from './containers/MainScheduleSection';
import MainCarousel from '@/components/MainCarousel';
import NoticeSection from './containers/NoticeSection';
import PetitionSection from './containers/PetitionSection';
import { Spacing } from '@/components/Spacing';

export function MainPage() {
  return (
    <main>
      <MainCarousel />
      <MainScheduleSection />
      <div className="xs:pl-[3.125rem] sm:pl-[3.125rem] md:pl-[3.125rem] lg:px-[12.5rem] xl:px-[12.5rem] xxl:px-[12.5rem]">
        <Spacing size={86} direction="vertical" />
        <NoticeSection noticeCount={10} />
        <Spacing size={37} direction="vertical" />
        <hr className="w-screen xs:-ml-[3.125rem] sm:-ml-[3.125rem] md:-ml-[3.125rem] lg:-ml-[12.5rem] xl:-ml-[12.5rem] xxl:-ml-[12.5rem]" />
        <Spacing size={88} direction="vertical" />
        <PetitionSection />
      </div>
    </main>
  );
}
