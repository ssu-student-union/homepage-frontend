import { Header } from "@/containers/common/Header/Header";
import { MainHeroSection } from "./containers/MainHeroSection";
import { MainScheduleSection } from "./containers/MainScheduleSection";

export function MainPage() {
  return (
    <>
      <Header />
      <MainHeroSection />
      <MainScheduleSection />
    </>
  );
}
