import { Header } from '@/containers/common/Header/Header';
import { MainHeroSection } from './containers/MainHeroSection';
import { MainScheduleSection } from './containers/MainScheduleSection';
import Pagination from '@/components/Pagination';
import { useCurrentPage } from '@/hooks/useCurrentPage';
import Breadcrumb from '@/components/Breadcrumb';
import { State } from '@/containers/common/Header/const/state';

export function MainPage() {
  const { currentPage, handlePageChange } = useCurrentPage(1); // 페이지 상태 관리 훅
  const totalPages = 10; // 총 페이지 수
  const breadcrumbItems = new Map<string, string | null>([
    ['학교생활', null],
    ['공지사항', '/notice'],
    ['중앙기구', '/notice?category=center'],
  ]);

  return (
    <>
      <Header state={State.Login} />
      <MainHeroSection />
      <MainScheduleSection />
      <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
      <Breadcrumb items={breadcrumbItems} className="text-sm" />
    </>
  );
}
