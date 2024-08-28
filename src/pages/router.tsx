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
import { PetitionNoticePage } from './petition-notice/page';
import { PetitionNoticeEditPage } from './petition-notice/edit/page';
import { PetitionNoticeDetailPage } from './petition-notice/[id]/page';
import { Data } from './data/page';
import { PartnershipEditPage } from './partnership/partnershipEdit/page';
import { PartnershipDetailPage } from './partnership/partnershipDetail/page';

function Layout() {
  var headerState: State;
  if (!localStorage.getItem('accessToken')) {
    headerState = State.Logout;
  } else {
    headerState = State.Login;
  }

  return (
    <>
      <Header state={headerState} />
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
        <Route path="/intro/edit" element={<IntroEditPage />} />
        <Route path="/audit" element={<AuditPage />} />
        <Route path="/audit/:id" element={<AuditDetailPage />} />
        <Route path="/audit/edit" element={<AuditEditPage />} />
        <Route path="/partnership" element={<PartnershipPage />} />
        <Route path="/partnership/edit" element={<PartnershipEditPage />} />
        <Route path="/partnership/:id" element={<PartnershipDetailPage />} />
        <Route path="/petition-notice" element={<PetitionNoticePage />} />
        <Route path="/petition-notice/edit" element={<PetitionNoticeEditPage />} />
        <Route path="/petition-notice/:id" element={<PetitionNoticeDetailPage />} />
        <Route path="/data" element={<Data />} />
        <Route path="/data/edit" element={<Data />} />
      </Route>
      <Route path="/register" element={<KakaoRegisterPage />} />
      <Route path="/register/:sort" element={<GeneralRegisterPage />} />
      <Route path="/auth/callback" element={<KakaoRedirect />} />
    </Routes>
  );
}
