import { Routes, Route } from 'react-router-dom';
import { MainPage } from './main/page';
import { KakaoRegisterPage } from './kakao/page';
import { GeneralRegisterPage } from './general/page';
import KakaoRedirect from './kakao/containers/KakaoRedirect';
import { IntroPage } from './intro/page';
import { IntroEditPage } from './intro/IntroEdit/page';
import { AuditPage } from './audit/page';
import { AuditDetailPage } from './audit/auditDetail/page';
import { AuditEditPage } from './audit/auditEdit/page';
import { PartnershipPage } from './partnership/page';
import { PetitionNoticePage } from './petition-notice/page';
import { PetitionNoticeEditPage } from './petition-notice/edit/page';
import { PetitionNoticeDetailPage } from './petition-notice/[id]/page';
import { Data } from './data/page';
import { PartnershipDetailPage } from './partnership/partnershipDetail/page';
import { PartnershipEditPage } from './partnership/partnershipEdit/page';
import PartnershipPatchPage from './partnership/partnershipPatch/page';
import { NoticePage } from './notice/page';
import { NoticeEditPage } from './notice/noticeEdit/page';
import { NoticeDetailPage } from './notice/noticeDetail/page';
import NoticePatchPage from './notice/noticePatch/page';
import { AuditPatchPage } from './audit/auditPatch/page';
import { HeaderLayout } from './layout/headerLayout';

export function MainRouter() {
  return (
    <Routes>
      <Route path="/" element={<HeaderLayout />}>
        <Route path="/" element={<MainPage />} />
        <Route path="/intro" element={<IntroPage />} />
        <Route path="/intro/edit" element={<IntroEditPage />} />
        <Route path="/audit" element={<AuditPage />} />
        <Route path="/audit/:id" element={<AuditDetailPage />} />
        <Route path="/audit/edit" element={<AuditEditPage />} />
        <Route path="/audit/:id/patch" element={<AuditPatchPage />} />
        <Route path="/partnership" element={<PartnershipPage />} />
        <Route path="/partnership/:id" element={<PartnershipDetailPage />} />
        <Route path="/partnership/edit" element={<PartnershipEditPage />} />
        <Route path="/partnership/:id/patch" element={<PartnershipPatchPage />} />
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
