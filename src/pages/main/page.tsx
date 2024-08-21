import { MainScheduleSection } from './containers/MainScheduleSection';
import MainCarousel from '@/components/MainCarousel';
import NoticeSection from './containers/NoticeSection';

export function MainPage() {
  return (
    <main>
      <MainCarousel />
      <MainScheduleSection />
      <div className="xs:pl-[3.125rem] sm:pl-[3.125rem] md:px-[12.5rem] lg:px-[12.5rem] xl:px-[12.5rem] xxl:px-[12.5rem]">
        <NoticeSection noticeCount={10} />
      </div>
    </main>
  );
}
