import { Routes, Route } from "react-router-dom";
import { MainPage } from "./main/page";
import { IntroPage } from "./intro/page";

export function MainRouter() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/intro" element={<IntroPage />} />
    </Routes>
  );
}
