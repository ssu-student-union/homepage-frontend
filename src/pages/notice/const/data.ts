// Breadcrumb
export const items = new Map<string, string | null>([
  ['공지사항', null],
  ['공지사항', '/homepage-frontend/notice?category=all'],
]);

export const categoryMap: Record<string, string | null> = {
  all: '전체',
  plan: '총학생회',
  manage: '중앙운영위원회',
  vote: '중앙선거관리위원회',
  club: '동아리연합회',
};
