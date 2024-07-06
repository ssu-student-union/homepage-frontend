import { Routes, Route } from "react-router-dom";
import { MainPage } from "./main/page";
import { KakaoRegisterPage } from "./kakao/page";
import { GeneralRegisterPage } from "./general/page";

export function MainRouter() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/kakao/register" element={<KakaoRegisterPage />} />
      <Route path="/general/register" element={<GeneralRegisterPage />} />
    </Routes>
  );
}
