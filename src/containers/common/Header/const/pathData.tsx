export const menuItems = {
  소개: [
    { name: '총학생회', path: '/homepage-frontend/intro?category=president&sub-category=intro' },
    {
      name: '중앙집행위원회',
      path: '/homepage-frontend/intro?category=central_executive_committee&sub-category=intro',
    },
    {
      name: '중앙운영위원회',
      path: '/homepage-frontend/intro?category=central_operating_committee&sub-category=intro',
    },
  ],
  학교생활: [
    { name: '공지사항', path: '/homepage-frontend/notice' },
    { name: '일정', path: '/homepage-frontend/menu7' },
    { name: '제휴안내', path: '/homepage-frontend/partnership' },
    //{ name: "분실물게시판", path: "/lost-article" }, // 보류
    { name: '캠퍼스맵', path: '/homepage-frontend/campus' },
  ],
  학생자치기구: [
    { name: '산하기구', path: '/homepage-frontend/affiliated_organization' },
    { name: '특별기구', path: '/homepage-frontend/special_organization' },
    { name: '감사기구', path: '/homepage-frontend/intro?category=audit&sub-category=intro' },
  ],
  소통: [
    { name: '학생청원게시판', path: '/homepage-frontend/petition-notice' },
    { name: '건의게시판', path: '/homepage-frontend/sug-notice' },
    { name: '인권신고게시판', path: '/homepage-frontend/human-notice' },
  ],
};

export const dataPath = '/homepage-frontend/data'; // 자료집 라우트 경로

export const myPath = `/homepage-frontend/my`; // 내정보 라우트 경로
