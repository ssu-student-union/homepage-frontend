import { Navigate, Route, Routes } from 'react-router-dom';
import * as i from './index.ts';

export function MainRouter() {
  return (
    <Routes>
      <Route path="/" element={<i.Layout />}>
        <Route path="/" element={<i.MainPage />} />
        {/* 1. 소개 */}
        <Route path="/intro" element={<i.IntroPage />} />
        <Route path="/intro/edit" element={<i.IntroEditPage />} />
        {/* 2. 학교생활 */}
        {/* 2-1. 공지사항 */}
        <Route path="/notice" element={<i.NoticePage />} />
        <Route path="/notice/:id" element={<i.NoticeDetailPage />} />
        <Route path="/notice/edit" element={<i.NoticeEditPage />} />
        <Route path="/notice/:id/patch" element={<i.NoticePatchPage />} />
        {/* 2-2. 제휴 */}
        <Route path="/partnership" element={<i.PartnershipPage />} />
        <Route path="/partnership/:id" element={<i.PartnershipDetailPage />} />
        <Route path="/partnership/edit" element={<i.PartnershipEditPage />} />
        <Route path="/partnership/:id/patch" element={<i.PartnershipPatchPage />} />
        {/* 2-3. 분실물 */}
        <Route path="/lost-article" element={<i.LostArticlePage />} />
        <Route path="/lost-article/:id" element={<i.LostDetailPage />} />
        <Route path="/lost-article/edit" element={<i.LostArticleEditPage />} />
        <Route path="/lost-article/:id/patch" element={<i.LostPatchPage />} />
        {/* 2-4.캠퍼스맵 */}
        <Route path="/campus-map" element={<i.CampusPage />} />
        {/* 3. 학생자치기구 */}
        <Route path="/petition-notice" element={<i.PetitionNoticePage />} />
        <Route path="/petition-notice/edit" element={<i.PetitionNoticeEditPage />} />
        <Route path="/petition-notice/:id" element={<i.PetitionNoticeDetailPage />} />
        {/* 4. 소통 */}
        <Route path="/audit" element={<i.AuditPage />} />
        <Route path="/audit/:id" element={<i.AuditDetailPage />} />
        <Route path="/audit/edit" element={<i.AuditEditPage />} />
        <Route path="/audit/:id/patch" element={<i.AuditPatchPage />} />
        {/* 4-1. 인권신고게시판*/}
        <Route path="/human-rights" element={<i.HumanRightsPage />} />
        <Route path="/human-rights/:id" element={<i.HumanRightsDetailPage />} />
        <Route path="/human-rights/:id?/edit" element={<i.HumanRightsEditPage />} />
        {/* 4-2. 건의 게시판 */}
        <Route path="/sug-notice" element={<i.SuggestPage />} />
        {/* 5. 마이페이지 */}
        <Route path="/mypage" element={<i.MyPage />} />
        {/* 개인정보이용약관 */}
        <Route path="/personal-data" element={<i.PersonalDataPage />} />
      </Route>
      {/* 온보딩 */}
      <Route path="/register" element={<i.KakaoRegisterPage />} />
      <Route path="/register/redirect" element={<i.KakaoRegisterRedirectPage />} />
      <Route path="/register/:sort" element={<i.GeneralRegisterPage />} />
      <Route path="/auth/callback" element={<i.KakaoRedirect />} />
      {/* 이외 경로 리다이렉트 처리 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
