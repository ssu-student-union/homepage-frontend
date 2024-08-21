import { Routes, Route, Outlet } from 'react-router-dom';
import { MainPage } from './main/page';
import { KakaoRegisterPage } from './kakao/page';
import { GeneralRegisterPage } from './general/page';
import KakaoRedirect from './kakao/containers/KakaoRedirect';
import { IntroPage } from './intro/page';
import { IntroEditPage } from './intro/IntroEdit/page';
import { AuditPage } from './audit/page';
import { AuditDetailPage } from './audit/auditDetail/page';
import { AuditEditPage } from './audit/auditEdit/page';
import { Header } from '@/containers/common/Header/Header';
import { State } from '@/containers/common/Header/const/state';
import { BoardPage } from './boardTest/page';
import { PartnershipPage } from './partnership/page';
import { Data } from './data/page';

function Layout() {
  return (
    <>
      <Header state={State.Logout} /> {/* 이 State 값으로 온보딩에 따른 Header 상태 관리 */}
      <main>
        <Outlet />
      </main>
    </>
  );
}

export function MainRouter() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
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
        <Route path="/partnership" element={<PartnershipPage />} />
        <Route path="/data" element={<Data />} />
        <Route path="/data/edit" element={<Data />} />
      </Route>
    </Routes>
  );
}
