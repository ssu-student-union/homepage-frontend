import { Header, State } from "@/containers/common/Header/Header";
import { MainHeroSection } from "./containers/MainHeroSection";
import { MainScheduleSection } from "./containers/MainScheduleSection";
import Pagination from "@/components/Pagination";
import { useCurrentPage } from "@/hooks/useCurrentPage";

export function MainPage() {
  const { currentPage, handlePageChange } = useCurrentPage(1); // 페이지 상태 관리 훅
  const totalPages = 10; // 총 페이지 수

  return (
    <>
      <Header state={State.Logout} />
      <MainHeroSection />
      <MainScheduleSection />
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  );
}
