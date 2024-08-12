import { Routes, Route } from 'react-router-dom';
import { MainPage } from './main/page';
import { BoardPage } from './boardTest/page';
import { IntroPage } from './intro/page';

export function MainRouter() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/intro" element={<IntroPage />} />
      {/*<Route path="intro/edit" element={<IntroEditPage />} /> API 개발 후 추가*/}
      <Route path="/board" element={<BoardPage />} />
    </Routes>
  );
}
