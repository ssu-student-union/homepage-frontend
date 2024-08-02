interface CategoryType {
  [props: string]: string[];
}

// 총학생회
export const StudentUnion: CategoryType = {
  총학생회: ['소개', '조직도'],
  중앙집행위원회: ['소개', '조직도'],
  중앙운영위원회: ['소개', '조직도'],
};

// 공지사항
export const Notices: CategoryType = {
  중앙: ['전체', '중앙집행위원회', '중앙운영위원회', '선거관리위원회', '동아리연합회'],
  단과대: ['전체', '경영', '경제통상', '공과', '법과', '사회과학', '인문', '자연과학', 'IT', '융특'],
};

// 감사기구
export const Auditbody: CategoryType = {
  소개: ['전체', '감사계획', '감사결과', '기타'],
  게시판: [],
};

// 제휴안내
type PartnershipType = '전체' | '의료' | '문화' | '뷰티' | '건강' | '음식' | '교육' | '주거';
export const Partnership: PartnershipType[] = ['전체', '의료', '문화', '뷰티', '건강', '음식', '교육', '주거'];

// 분실물 게시판
type LostandFoundType = '분실물 현황' | '분실 신고';
export const LostandFound: LostandFoundType[] = ['분실물 현황', '분실 신고'];

// 메인페이지 공지사항
type MainNoticesType = '전체' | '행사&이벤트' | '소통' | '감사결과';
export const MainNotices: MainNoticesType[] = ['전체', '행사&이벤트', '소통', '감사결과'];

// 메인페이지 인기청원
type MainPopularPetitionType = '인기' | '최근' | '청원';
export const MainPopularPetition: MainPopularPetitionType[] = ['인기', '최근', '청원'];

// 메인페이지 분실물
type MainLostandFoundType = '전체' | '전자기기' | '소모품';
export const MainLostandFound: MainLostandFoundType[] = ['전체', '전자기기', '소모품'];
