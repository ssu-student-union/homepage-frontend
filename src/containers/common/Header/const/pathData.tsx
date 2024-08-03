export const menuItems = {
  소개: [
    { name: '총학생회', path: '/intro?category=president' },
    {
      name: '중앙집행위원회',
      path: '/intro?category=central_executive_committee',
    },
    {
      name: '중앙운영위원회',
      path: '/intro?category=central_operating_committee',
    },
  ],
  학교생활: [
    { name: '공지사항', path: '/notice' },
    { name: '일정', path: '/menu7' },
    { name: '제휴안내', path: '/partnership' },
    //{ name: "분실물게시판", path: "/lost-article" }, // 보류
    { name: '캠퍼스맵', path: '/campus' },
  ],
  학생자치기구: [
    { name: '산하기구', path: '/affiliated_organization' },
    { name: '특별기구', path: '/special_organization' },
    { name: '감사기구', path: '/intro?category=audit' },
  ],
  소통: [
    { name: '학생청원게시판', path: '/petition-notice' },
    { name: '건의게시판', path: '/sug-notice' },
    { name: '인권신고게시판', path: '/human-notice' },
  ],
};

export const dataPath = "/data"; // 자료집 라우트 경로