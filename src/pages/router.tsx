import { Navigate, Route, Routes } from 'react-router';
import { MainPage } from './main/page';
import { KakaoRegisterPage } from './register/page';
import KakaoRedirect from './register/auth/callback/page';
import { HumanRightsPage } from './human-rights/page';
import { HumanRightsDetailPage } from './human-rights/[id]/page';
import { HumanRightsEditPage } from './human-rights/edit/page';
import { SuggestPage } from './sug-notice/page';
import { SuggestDetailPage } from './sug-notice/[id]/page';
import { SuggestWritePage } from './sug-notice/edit/page';
import { NoticePage } from './notice/page';
import { NoticeEditPage } from './notice/edit/page';
import NoticeDetailPage from './notice/[id]/page';
import NoticePatchPage from './notice/patch/page';
import CampusPage from './campus/page';
import PersonalDataPage from './personal-data/page';
import { MainLayout } from './layout/MainLayout';
import { KakaoRegisterRedirectPage } from './register/redirect/page';
import MyPage from './mypage/page';
import DataPage from './data/page';
import DataDetailPage from './data/[id]/page';
import DataEditPage from './data/edit/page';
import ProfilePage from './mypage/profile/page';
import MyPostsPage from './mypage/myPosts/page';
import { ServiceNoticePage } from './mypage/service-notice/page';
import { ServiceNoticeDetailPage } from './mypage/service-notice/[id]/page';
import { ServiceNoticeEditPage } from './mypage/service-notice-edit/page';
import ServiceNoticePatchPage from './mypage/service-notice/service-noticePatch/page';
import { QnApage } from './qna-notice/page';
import QnaDetailPage from './qna-notice/[id]/page';
import QnaEditPage from './qna-notice/edit/page';
import { TOSPage } from './register/step/tos/page';
import { OnboardingPage } from './register/step/onboarding/page';
import { CertifyErrorPage } from './register/step/errorcheck/page';
import { CertifyApplyPage } from './register/step/errorapply/page';
import { GeneralLoginPage } from './register/step/scouncil/page';
import { RegisterLayout } from './layout/registerLayout';
import IntroPage from './intro/page';
import { SchedulePage } from './schedule/page';
import { ScheduleEditPage } from './schedule/edit/page';

export function MainRouter() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<MainPage />} />
        {/* 1. 소개 */}
        <Route path="/intro" element={<IntroPage />} />
        {/* 2. 학교생활 */}
        {/* 2-1. 공지사항 */}
        <Route path="/notice" element={<NoticePage />} />
        <Route path="/notice/:id" element={<NoticeDetailPage />} />
        <Route path="/notice/edit" element={<NoticeEditPage />} />
        <Route path="/notice/:id/patch" element={<NoticePatchPage />} />
        {/* 2-2. 제휴 */}
        {/* 2-3. 분실물 */}
        {/* 2-4.캠퍼스맵 */}
        <Route path="/campus-map" element={<CampusPage />} />
        {/* 4. 소통 */}
        {/* 4-1. 인권신고게시판*/}
        <Route path="/human-rights" element={<HumanRightsPage />} />
        <Route path="/human-rights/:id" element={<HumanRightsDetailPage />} />
        <Route path="/human-rights/:id?/edit" element={<HumanRightsEditPage />} />
        {/* 4-2. 건의 게시판 */}
        <Route path="/sug-notice" element={<SuggestPage />} />
        <Route path="/sug-notice/:id" element={<SuggestDetailPage />} />
        <Route path="/sug-notice/:id?/edit" element={<SuggestWritePage />} />
        {/* 5. 마이페이지 */}
        {/* 5. 자료집 */}
        <Route path="/data" element={<DataPage />} />
        <Route path="/data/:id" element={<DataDetailPage />} />
        <Route path="/data/:id?/edit" element={<DataEditPage />} />
        {/* 마이페이지 */}
        {/*마이페이지*/}
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/mypage/profile" element={<ProfilePage />} />
        <Route path="/mypage/myposts" element={<MyPostsPage />} />
        {/*서비스 공지사항*/}
        <Route path="/service-notice" element={<ServiceNoticePage />} />
        <Route path="/service-notice/:id" element={<ServiceNoticeDetailPage />} />
        <Route path="/service-notice/edit" element={<ServiceNoticeEditPage />} />
        <Route path="/service-notice/:id/patch" element={<ServiceNoticePatchPage />} />
        {/* 개인정보이용약관 */}
        <Route path="/personal-data" element={<PersonalDataPage />} />
        {/* (질의응답게시판->) 건의게시판 */}
        <Route path="/qna" element={<QnApage />} />
        <Route path="/qna/:id" element={<QnaDetailPage />} />
        <Route path="/qna/:id?/edit" element={<QnaEditPage />} />
        {/* 일정 */}
        <Route path="/schedule" element={<SchedulePage />} />
        <Route path="/schedule/edit" element={<ScheduleEditPage />} />
      </Route>
      {/* 온보딩 */}
      <Route path="/register" element={<RegisterLayout />}>
        <Route path="/register" element={<KakaoRegisterPage />} />
        <Route path="/register/scouncil" element={<GeneralLoginPage />} />
        <Route path="/register/errorcheck" element={<CertifyErrorPage />} />
        <Route path="/register/errorapply" element={<CertifyApplyPage />} />
        <Route path="/register/tos" element={<TOSPage />} />
        <Route path="/register/onboarding" element={<OnboardingPage />} />
      </Route>
      <Route path="/register/redirect" element={<KakaoRegisterRedirectPage />} />
      <Route path="/auth/callback" element={<KakaoRedirect />} />
      {/* 이외 경로 리다이렉트 처리 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
