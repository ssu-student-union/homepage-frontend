import { Navigate, Route, Routes } from 'react-router';
import { MainPage } from '../pages/main/page';
import { KakaoRegisterPage } from '../pages/register/page';
import KakaoRedirect from '../pages/register/auth/callback/page';
import { HumanRightsPage } from '../pages/human-rights/page';
import { HumanRightsDetailPage } from '../pages/human-rights/[id]/page';
import { HumanRightsEditPage } from '../pages/human-rights/edit/page';
import { SuggestPage } from '../pages/sug-notice/page';
import { SuggestDetailPage } from '../pages/sug-notice/[id]/page';
import { SuggestWritePage } from '../pages/sug-notice/edit/page';
import { NoticePage } from '../pages/notice/page';
import { NoticeEditPage } from '../pages/notice/edit/page';
import NoticeDetailPage from '../pages/notice/[id]/page';
import NoticePatchPage from '../pages/notice/patch/page';
import CampusPage from '../pages/campus/page';
import PersonalDataPage from '../pages/personal-data/page';
import { MainLayout } from '../pages/layout/MainLayout';
import { KakaoRegisterRedirectPage } from '../pages/register/redirect/page';
import MyPage from '../pages/mypage/page';
import DataPage from '../pages/data/page';
import DataDetailPage from '../pages/data/[id]/page';
import DataEditPage from '../pages/data/edit/page';
import ProfilePage from '../pages/mypage/profile/page';
import MyPostsPage from '../pages/mypage/myPosts/page';
import { ServiceNoticePage } from '../pages/mypage/service-notice/page';
import { ServiceNoticeDetailPage } from '../pages/mypage/service-notice/[id]/page';
import { ServiceNoticeEditPage } from '../pages/mypage/service-notice-edit/page';
import ServiceNoticePatchPage from '../pages/mypage/service-notice/service-noticePatch/page';
import { QnApage } from '../pages/qna-notice/page';
import QnaDetailPage from '../pages/qna-notice/[id]/page';
import QnaEditPage from '../pages/qna-notice/edit/page';
import { TOSPage } from '../pages/register/step/tos/page';
import { OnboardingPage } from '../pages/register/step/onboarding/page';
import { CertifyErrorPage } from '../pages/register/step/errorcheck/page';
import { CertifyApplyPage } from '../pages/register/step/errorapply/page';
import { GeneralLoginPage } from '../pages/register/step/scouncil/page';
import { RegisterLayout } from '../pages/layout/RegisterLayout';
import IntroPage from '../pages/intro/page';
import { SchedulePage } from '../pages/schedule/page';
import { ScheduleEditPage } from '../pages/schedule/edit/page';

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
