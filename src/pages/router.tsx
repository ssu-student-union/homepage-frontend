import { Routes, Route } from "react-router-dom";
import { MainPage } from "./main/page";
import { KakaoRegisterPage } from "./kakao/page";
import { GeneralRegisterPage } from "./general/page";
import SocialKakao  from '@/pages/kakao/containers/KakaoLogin'
import KakaoAuthHandler from '@/pages/kakao/containers/KakaoAuthHandler'
import KakaoRedirect from "./kakao/containers/KakaoRedirect";


export function MainRouter() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/register" element={<KakaoRegisterPage />} />
      <Route path="/register/:sort" element={<GeneralRegisterPage />} />
      <Route path="/auth/callback" element={<KakaoRedirect />} />
      <Route path="/sam" element={<KakaoAuthHandler />} />

    </Routes>
  );
}
