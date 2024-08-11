import { Routes, Route } from 'react-router-dom';
import { MainPage } from './main/page';
import { IntroPage } from './Intro/page';
import { BoardPage } from './boardTest/page';
import { IntroEditPage } from './Intro/IntroEdit/page';

export function MainRouter() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/intro" element={<IntroPage />} />
      <Route path="intro/edit" element={<IntroEditPage />} />
      <Route path="/board" element={<BoardPage />} />
    </Routes>
  );
}
