// Breadcrumb
export const items = new Map<string, string | null>([
  ['공지사항', null],
  ['공지사항', '/homepage-frontend/notice?category=all'],
]);

export const categoryMap: Record<string, string | null> = {
  all: '전체',
  president: '총학생회',
  executive: '중앙운영위원회',
  operating: '중앙선거관리위원회',
  club: '동아리연합회',
};

export const mainName: string[] = ['중앙', '단과대'];

export const category: string[] = ['central', 'college'];

export const subName: string[] = ['전체', '총학생회', '중앙집행위원회', '중앙운영위원회', '동아리연합회'];

export const subCategory: string[] = ['all', 'president', 'central_executive_committee', 'central_operating_committee', 'club'];