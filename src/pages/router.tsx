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
import { PartnershipPage } from './partnership/page';
import { PetitionNoticePage } from './petition-notice/page';
import { PetitionNoticeEditPage } from './petition-notice/edit/page';
import { PetitionNoticeDetailPage } from './petition-notice/[id]/page';
import { Data } from './data/page';
import { PartnershipDetailPage } from './partnership/partnershipDetail/page';
import { PartnershipEditPage } from './partnership/partnershipEdit/page';
import AuditPatchPage from './audit/auditPatch/page';
import PartnershipPatchPage from './partnership/partnershipPatch/page';
import { NoticePage } from './notice/page';
import { NoticeEditPage } from './notice/noticeEdit/page';
import { NoticeDetailPage } from './notice/noticeDetail/page';
import NoticePatchPage from './notice/noticePatch/page';

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
      <Route path="/homepage-frontend" element={<Layout />}>
        <Route path="/homepage-frontend" element={<MainPage />} />
        <Route path="/homepage-frontend/intro" element={<IntroPage />} />
        <Route path="/homepage-frontend/intro/edit" element={<IntroEditPage />} />
        <Route path="/homepage-frontend/audit" element={<AuditPage />} />
        <Route path="/homepage-frontend/audit/:id" element={<AuditDetailPage />} />
        <Route path="/homepage-frontend/audit/edit" element={<AuditEditPage />} />
        <Route path="/homepage-frontend/audit/patch" element={<AuditPatchPage />} />
        <Route path="/homepage-frontend/partnership" element={<PartnershipPage />} />
        <Route path="/homepage-frontend/partnership/:id" element={<PartnershipDetailPage />} />
        <Route path="/homepage-frontend/partnership/edit" element={<PartnershipEditPage />} />
        <Route path="/homepage-frontend/partnership/:id/patch" element={<PartnershipPatchPage />} />
        <Route path="/homepage-frontend/petition-notice" element={<PetitionNoticePage />} />
        <Route path="/homepage-frontend/petition-notice/edit" element={<PetitionNoticeEditPage />} />
        <Route path="/homepage-frontend/petition-notice/:id" element={<PetitionNoticeDetailPage />} />
        <Route path="/homepage-frontend/data" element={<Data />} />
        <Route path="/homepage-frontend/data/edit" element={<Data />} />
        <Route path="/homepage-frontend/notice" element={<NoticePage />} />
        <Route path="/homepage-frontend/notice/:id" element={<NoticeDetailPage />} />
        <Route path="/homepage-frontend/notice/edit" element={<NoticeEditPage />} />
        <Route path="/homepage-frontend/notice/patch" element={<NoticePatchPage />} />
      </Route>
      <Route path="/homepage-frontend/register" element={<KakaoRegisterPage />} />
      <Route path="/homepage-frontend/register/:sort" element={<GeneralRegisterPage />} />
      <Route path="/homepage-frontend/auth/callback" element={<KakaoRedirect />} />
    </Routes>
  );
}
