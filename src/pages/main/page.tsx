import { Header } from "@/containers/common/Header/Header";
import { MainHeroSection } from "./containers/MainHeroSection";
import { MainScheduleSection } from "./containers/MainScheduleSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SocialKakao from "../kakao/containers/KakaoLogin";
import { Select } from "@/components/ui/select";


export function MainPage() {
  return (
    <>
      <Header />
      <MainHeroSection />
      <MainScheduleSection />
      <Button variant={"default"} size={"default"} className="w-4/12" >안녕</Button>
      <Input type="text" className="w-4/12" />
      <SocialKakao />
      <Select />
    </>
  );
}
