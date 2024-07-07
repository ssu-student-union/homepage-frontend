import { Routes, Route } from "react-router-dom";
import { MainPage } from "./main/page";
import { BoardPage } from "./boardTest/page";

export function MainRouter() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/board/:category" element={<BoardPage />} />
      {/* <Route path="/board/:category/:subcategory" element={<BoardPage />} /> */}
    </Routes>
  );
}
