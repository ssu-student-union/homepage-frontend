import { Routes, Route } from 'react-router-dom';
import { MainPage } from './main/page';
import { IntroPage } from './intro/page';
import { BoardPage } from './boardTest/page';

export function MainRouter() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/intro" element={<IntroPage />} />
      <Route path="/board" element={<BoardPage />} />
    </Routes>
  );
}
