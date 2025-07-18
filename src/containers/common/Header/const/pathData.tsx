// MenuItem에 들어갈 값은 "/Header/const/pathData"에서 관리합니다.
export interface MenuItem {
  name: string;
  path: string;
}

export const MENU_ITEMS: Record<string, MenuItem[]> = {
  소개: [
    { name: '총학생회', path: '/intro?category=총학생회&sub=소개' },
    {
      name: '중앙운영위원회',
      path: '/intro?category=중앙운영위원회&sub=소개',
    },
    {
      name: '중앙집행위원회',
      path: '/intro?category=중앙집행위원회&sub=소개',
    },
  ],
  공지사항: [
    {
      name: '중앙 공지사항',
      path: '/notice?category=중앙',
    },
    {
      name: '단과대 공지사항',
      path: '/notice?category=단과대',
    },
    {
      name: '서비스 공지사항',
      path: '/service-notice',
    },
  ],
  // 학교생활: [
  //   { name: '공지사항', path: '/notice' },
  //   // { name: '일정', path: '/menu7' },
  //   { name: '제휴안내', path: '/partnership' },
  //   { name: '분실물게시판', path: '/lost-article?category=state' },
  //   { name: '캠퍼스맵', path: '/campus-map' },
  // ],
  // 학생자치기구: [
  //   // { name: '산하기구', path: '/affiliated_organization' },
  //   // { name: '특별기구', path: '/special_organization' },
  //   { name: '감사기구', path: '/audit?category=all' },
  // ],
  // 소통: [
  //   { name: '학생청원게시판', path: '/petition-notice' },
  //   { name: '건의게시판', path: '/sug-notice' },
  //   { name: '인권신고게시판', path: '/human-rights' },
  // ],
  소통: [
    { name: '인권신고게시판', path: '/human-rights' },
    { name: '건의게시판', path: '/qna' },
  ],
} as const;

export const DATA_PATH = '/data' as const; // 자료집 라우트 경로

export const MYPAGE_PATH = `/my` as const; // 내정보 라우트 경로

export const QNA_PATH = '/qna' as const; //
