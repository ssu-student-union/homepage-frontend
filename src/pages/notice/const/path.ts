// Breadcrumb
export const items = new Map<string, string | null>([
  ['학교생활', null],
  ['공지사항', '/notice'],
  ['중앙', '/notice?category=center'],
]);

export const categoryMap: Record<string, string | null> = {
  중앙: '중앙',
};

export const subCategoryMap: Record<string, string | null> = {
  all: '전체',
  plan: '총학생회',
  result: '중앙운영위원회',
  ect: '중앙선거관리위원회',
  d: '동아리연합회',
};
