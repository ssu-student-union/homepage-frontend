// Breadcrumb
export const items = new Map<string, string | null>([
  ['공지사항', null],
  ['공지사항', '/notice?category=central&sub-category=all'],
]);
export const mainName: string[] = ['중앙', '단과대'];

export const category: string[] = ['central', 'college'];

export const subName: string[] = ['전체', '총학생회', '중앙집행위원회', '중앙운영위원회', '동아리연합회'];

export const subCategory: string[] = [
  'all',
  'president',
  'central_executive_committee',
  'central_operating_committee',
  'club',
];
// 영어와 한글 매핑
export const categoryMap: Record<string, string> = {
  central: '중앙',
  college: '단과대',
};

export const subCategoryMap: Record<string, string> = {
  all: '전체',
  president: '총학생회',
  central_executive_committee: '중앙집행위원회',
  central_operating_committee: '중앙운영위원회',
  club: '동아리연합회',
};

// 반대로 한글을 영어로 변환하는 맵도 추가
export const reverseCategoryMap: Record<string, string> = {
  중앙: 'central',
  단과대: 'college',
};

export const reverseSubCategoryMap: Record<string, string> = {
  전체: 'all',
  총학생회: 'president',
  중앙집행위원회: 'central_executive_committee',
  중앙운영위원회: 'central_operating_committee',
  동아리연합회: 'club',
};
