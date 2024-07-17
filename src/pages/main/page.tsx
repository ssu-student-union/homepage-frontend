import { Header } from "@/containers/common/Header/Header";
import { MainHeroSection } from "./containers/MainHeroSection";
import { MainScheduleSection } from "./containers/MainScheduleSection";
import { Search } from "@/components/Search/Search";

export function MainPage() {
  return (
    <>
      <Header />
      <MainHeroSection />
      <MainScheduleSection />
      <div className="m-10">
        <Search />
      </div>
    </>
  );
}
