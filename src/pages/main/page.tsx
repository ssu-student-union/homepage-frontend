import { Header, State } from "@/containers/common/Header/Header";
import { MainHeroSection } from "./containers/MainHeroSection";
import { MainScheduleSection } from "./containers/MainScheduleSection";

export function MainPage() {
  return (
    <>
      <Header state={State.LoginPage}/>
      <MainHeroSection />
      <MainScheduleSection />
    </>
  );
}
