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
import { LostArticlePage } from './lost-article/page';
import { LostArticleEditPage } from './lost-article/edit/page';
import CampusPage from './campus/page';
import { LostDetailPage } from './lost-article/detail/page';
import { LostPatchPage } from './lost-article/patch/page';
import PersonalDataPage from './personal-data/page';
import { Layout } from './layout/headerLayout';
import { KakaoRegisterPassuPage } from './kakao/passu/page';

export function MainRouter() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/beta" element={<MainPage />} />
        {/*소개*/}
        <Route path="/intro" element={<IntroPage />} />
        <Route path="/intro/edit" element={<IntroEditPage />} />
        {/*학교생활*/}
        {/*공지사항*/}
        <Route path="/notice" element={<NoticePage />} />
        <Route path="/notice/:id" element={<NoticeDetailPage />} />
        <Route path="/notice/edit" element={<NoticeEditPage />} />
        <Route path="/notice/:id/patch" element={<NoticePatchPage />} />
        {/*제휴*/}
        <Route path="/partnership" element={<PartnershipPage />} />
        <Route path="/partnership/:id" element={<PartnershipDetailPage />} />
        <Route path="/partnership/edit" element={<PartnershipEditPage />} />
        <Route path="/partnership/:id/patch" element={<PartnershipPatchPage />} />
        {/*분실물*/}
        <Route path="/lost-article" element={<LostArticlePage />} />
        <Route path="/lost-article/:id" element={<LostDetailPage />} />
        <Route path="/lost-article/edit" element={<LostArticleEditPage />} />
        <Route path="/lost-article/:id/patch" element={<LostPatchPage />} />
        {/*캠퍼스맵*/}
        <Route path="/campus-map" element={<CampusPage />} />
        {/*학생자치기구*/}
        <Route path="/petition-notice" element={<PetitionNoticePage />} />
        <Route path="/petition-notice/edit" element={<PetitionNoticeEditPage />} />
        <Route path="/petition-notice/:id" element={<PetitionNoticeDetailPage />} />
        {/*소통*/}
        <Route path="/audit" element={<AuditPage />} />
        <Route path="/audit/:id" element={<AuditDetailPage />} />
        <Route path="/audit/edit" element={<AuditEditPage />} />
        <Route path="/audit/:id/patch" element={<AuditPatchPage />} />
        {/*자료집*/}
        <Route path="/data" element={<Data />} />
        <Route path="/data/edit" element={<Data />} />
        {/*개인정보이용약관*/}
        <Route path="/personal-data" element={<PersonalDataPage />} />
      </Route>
      {/*온보딩*/}
      <Route path="/register" element={<KakaoRegisterPage />} />
      <Route path="/register/passu" element={<KakaoRegisterPassuPage />} />
      <Route path="/register/:sort" element={<GeneralRegisterPage />} />
      <Route path="/auth/callback" element={<KakaoRedirect />} />
    </Routes>
  );
}
