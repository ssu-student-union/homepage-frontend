import { Routes, Route } from "react-router-dom";
import { MainPage } from "./main/page";
import { BoardTestPage } from "./boardTest/page";

export function MainRouter() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/boardTest/:category" element={<BoardTestPage />} />
    </Routes>
  );
}
