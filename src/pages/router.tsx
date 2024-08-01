import { Routes, Route } from "react-router-dom";
import { MainPage } from "./main/page";
import { IntroPage } from "./intro/page";
import { BoardPage } from "./boardTest/page";
import { PetitionNoticePage } from "./petition-notice/page";
import { PetitionNoticeEditPage } from "./petition-notice/edit/page";
import { PetitionNoticeDetailPage } from "./petition-notice/[id]/page";

export function MainRouter() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/intro" element={<IntroPage />} />
      <Route path="/board" element={<BoardPage />} />
      <Route path="/petition-notice" element={<PetitionNoticePage />} />
      <Route
        path="/petition-notice/edit"
        element={<PetitionNoticeEditPage />}
      />
      <Route
        path="/petition-notice/:id"
        element={<PetitionNoticeDetailPage />}
      />
    </Routes>
  );
}
