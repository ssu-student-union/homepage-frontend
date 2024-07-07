interface CategoryType {
  [props: string]: string[];
}

// 총학생회
export const StudentUnion: CategoryType = {
  총학생회: ["소개", "조직도"],
  중앙집행위원회: ["소개", "조직도"],
  중앙운영위원회: ["소개", "조직도"],
};

// 공지사항
export const Notices: CategoryType = {
  중앙: [
    "전체",
    "조직도",
    "중앙집행위원회",
    "중앙운영위원회",
    "선거관리위원회",
    "동아리연합회",
  ],
  단과대: [
    "전체",
    "경영",
    "경제통상",
    "공과",
    "법과",
    "사회과학",
    "인문",
    "자연과학",
    "IT",
    "융특",
  ],
};

// 제휴안내
export const Partnership: string[] = [
  "전체",
  "의료",
  "문화",
  "뷰티",
  "건강",
  "음식",
  "교육",
  "주거",
];

// 분실물 게시판
export const LostandFound: string[] = ["분실물 현황", "분실 신고"];

// 감사기구
export const Auditbody: string[] = ["소개", "게시판"];

// 메인페이지 공지사항
export const MainNotices: string[] = [
  "전체",
  "행사&이벤트",
  "소통",
  "감사결과",
];

// 메인페이지 인기청원
export const MainPopularPetition: string[] = ["인기", "최근", "청원"];

// 메인페이지 분실물
export const MainLostandFound: string[] = ["전체", "전자기기", "소모품"];
