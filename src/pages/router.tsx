import { Routes, Route } from 'react-router-dom';
import { MainPage } from './main/page';
import { BoardPage } from './boardTest/page';
import { KakaoRegisterPage } from './kakao/page';
import { GeneralRegisterPage } from './general/page';
import KakaoRedirect from './kakao/containers/KakaoRedirect';
import { IntroPage } from './intro/page';
import { IntroEditPage } from './intro/IntroEdit/page';
import { AuditPage } from './audit/page';
import { AuditDetailPage } from './audit/auditDetail/page';
import { AuditEditPage } from './audit/auditEdit/page';

export function MainRouter() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/intro" element={<IntroPage />} />
      <Route path="/board" element={<BoardPage />} />
      <Route path="/register" element={<KakaoRegisterPage />} />
      <Route path="/register/:sort" element={<GeneralRegisterPage />} />
      <Route path="/auth/callback" element={<KakaoRedirect />} />
      <Route path="/intro/edit" element={<IntroEditPage />} />
      <Route path="/audit" element={<AuditPage />} />
      <Route path="/audit/:id" element={<AuditDetailPage />} />
      <Route path="/audit/edit" element={<AuditEditPage />} />
    </Routes>
  );
}
