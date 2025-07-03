import { Navigate, Route, Routes } from 'react-router';
import * as i from './index.ts';

export function MainRouter() {
  return (
    <Routes>
      <Route path="/" element={<i.Layout />}>
        <Route path="/" element={<i.MainPage />} />
        {/* 1. 소개 */}
        <Route path="/intro" element={<i.IntroPage />} />
        {/* 2. 학교생활 */}
        {/* 2-1. 공지사항 */}
        <Route path="/notice" element={<i.NoticePage />} />
        <Route path="/notice/:id" element={<i.NoticeDetailPage />} />
        <Route path="/notice/edit" element={<i.NoticeEditPage />} />
        <Route path="/notice/:id/patch" element={<i.NoticePatchPage />} />
        {/* 2-2. 제휴 */}
        {/* 2-3. 분실물 */}
        {/* 2-4.캠퍼스맵 */}
        <Route path="/campus-map" element={<i.CampusPage />} />
        {/* 4. 소통 */}
        {/* 4-1. 인권신고게시판*/}
        <Route path="/human-rights" element={<i.HumanRightsPage />} />
        <Route path="/human-rights/:id" element={<i.HumanRightsDetailPage />} />
        <Route path="/human-rights/:id?/edit" element={<i.HumanRightsEditPage />} />
        {/* 4-2. 건의 게시판 */}
        <Route path="/sug-notice" element={<i.SuggestPage />} />
        <Route path="/sug-notice/:id" element={<i.SuggestDetailPage />} />
        <Route path="/sug-notice/:id?/edit" element={<i.SuggestWritePage />} />
        {/* 5. 마이페이지 */}
        {/* 5. 자료집 */}
        <Route path="/data" element={<i.DataPage />} />
        <Route path="/data/:id" element={<i.DataDetailPage />} />
        <Route path="/data/:id?/edit" element={<i.DataEditPage />} />
        {/* 마이페이지 */}
        {/*마이페이지*/}
        <Route path="/mypage" element={<i.MyPage />} />
        <Route path="/mypage/profile" element={<i.ProfilePage />} />
        <Route path="/mypage/myposts" element={<i.MyPostsPage />} />
        {/*서비스 공지사항*/}
        <Route path="/service-notice" element={<i.ServiceNoticePage />} />
        <Route path="/service-notice/:id" element={<i.ServiceNoticeDetailPage />} />
        <Route path="/service-notice/edit" element={<i.ServiceNoticeEditPage />} />
        <Route path="/service-notice/:id/patch" element={<i.ServiceNoticePatchPage />} />
        {/* 개인정보이용약관 */}
        <Route path="/personal-data" element={<i.PersonalDataPage />} />
        {/* (질의응답게시판->) 건의게시판 */}
        <Route path="/qna" element={<i.QnApage />} />
        <Route path="/qna/:id" element={<i.QnaDetailPage />} />
        <Route path="/qna/:id?/edit" element={<i.QnaEditPage />} />
      </Route>
      {/* 온보딩 */}
      <Route path="/register" element={<i.RegisterLayout />}>
        <Route path="/register" element={<i.KakaoRegisterPage />} />
        <Route path="/register/scouncil" element={<i.GeneralLoginPage />} />
        <Route path="/register/errorcheck" element={<i.CertifyErrorPage />} />
        <Route path="/register/errorapply" element={<i.CertifyApplyPage />} />
        <Route path="/register/tos" element={<i.TOSPage />} />
        <Route path="/register/onboarding" element={<i.OnboardingPage />} />
      </Route>
      <Route path="/register/redirect" element={<i.KakaoRegisterRedirectPage />} />
      <Route path="/auth/callback" element={<i.KakaoRedirect />} />
      {/* 이외 경로 리다이렉트 처리 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
