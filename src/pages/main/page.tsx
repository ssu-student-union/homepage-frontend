import { Header } from '@/containers/common/Header/Header';
import { MainHeroSection } from './containers/MainHeroSection';
import { MainScheduleSection } from './containers/MainScheduleSection';
import Pagination from '@/components/Pagination';
import { useCurrentPage } from '@/hooks/useCurrentPage';
import Breadcrumb from '@/components/Breadcrumb';
import { State } from '@/containers/common/Header/const/state';
import { PostCardNotice } from '@/components/PostCard/PostCardNotice';
import { PostTextPetitionView } from '@/components/PostCard/PostTextPetitionView';
import { PostCardMissing } from '@/components/PostCard/PostCardBasicMissing';
import { Size } from '@/components/PostCard/const/state';

export function MainPage() {
  const { currentPage, handlePageChange } = useCurrentPage(1); // 페이지 상태 관리 훅
  const totalPages = 10; // 총 페이지 수
  const breadcrumbItems = new Map<string, string | null>([
    ['학교생활', null],
    ['공지사항', '/notice'],
    ['중앙기구', '/notice?category=center'],
  ]);

  return (
    <>
      <Header state={State.Login} />
      <MainHeroSection />
      <MainScheduleSection />
      <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
      <PostCardNotice
        imgUrl="이미지"
        title="[2024-1] 학기 학생회비 추가 납부 납부 방법 안내 어쩌구 저쩌구"
        date="2023/10/02"
        badgeType="New"
        profileName="중앙운영위원회"
      />
      <PostTextPetitionView
        title="청원 제목이 들어갈 자리입니다 청원 제목이 들어갈 자리입니다"
        subtitle="청원 게시글 내용입니다. 학생분들이 작성해주신 청원 내용이 이곳에 보여집니다. 작성해주신 청원 게시글 내용이 이곳에 보여집니다."
        date="2023/03/21"
        goodNumber={21}
      />
      <PostCardMissing
        imgUrl="이미지"
        title="에어팟 2세대를 잃어버린 주인을 찾아요 에어팟은 소중합니다 에어팟 주인을 찾습니다"
        subtitle="분실물 번호: 42 / 투명 하드 케이스를 장착한 에어팟 2세대를 보관중입니다. 투명 하드 케이스를 장착한 에어팟 2세대를 보관중입니다."
        date="2023/10/02"
        size={Size.default}
      />
      <Breadcrumb items={breadcrumbItems} />
    </>
  );
}
