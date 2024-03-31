import { Routes, Route } from "react-router-dom";
import { MainPage } from "./main/page";

export function MainRouter() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
    </Routes>
  );
}
