// Breadcrumb
export const items = new Map<string, string | null>([
  ['학교자치기구', null],
  ['감사기구', '/audit?category=all'],
]);

export const categoryMap: Record<string, string | null> = {
  all: '전체',
  plan: '감사계획',
  result: '감사결과',
  ect: '기타',
};
