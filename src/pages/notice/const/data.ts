// Breadcrumb
export const items = new Map<string, string | null>([
  ['공지사항', null],
  ['공지사항', '/notice?category=central&sub-category=all'],
]);
export const mainName: string[] = ['중앙', '단과대'];

export const category: string[] = ['central', 'college'];

export const subName: string[] = ['전체', '총학생회', '중앙운영위원회', '중앙선거관리위원회', '동아리연합회'];

export const subCategory: string[] = [
  'all',
  'president',
  'central_executive_committee',
  'central_operating_committee',
  'club',
];

export const categoryMap: Record<string, string> = {
  central: '중앙',
  college: '단과대',
};

export const categoryToCode: Record<string, string> = {
  central: '중앙기구',
  college: '단과대학생회',
};

export const subCategoryMap: Record<string, string> = {
  all: '전체',
  president: '총학생회',
  central_operating_committee: '중앙운영위원회',
  central_executive_committee: '중앙선거관리위원회',
  club: '동아리연합회',
};

export const subCategoryToCode: Record<string, string> = {
  all: '',
  president: '총학생회',
  central_operating_committee: '중앙운영위원회',
  central_executive_committee: '중앙선거관리위원회',
  club: '동아리연합회',
};

export const reverseCategoryMap: Record<string, string> = {
  중앙: 'central',
  단과대: 'college',
};

export const reverseSubCategoryMap: Record<string, string> = {
  전체: 'all',
  총학생회: 'president',
  중앙운영위원회: 'central_operating_committee',
  중앙선거관리위원회: 'central_executive_committee',
  동아리연합회: 'club',
};

export const collegeSubCategoryMap: Record<string, string> = {
  all: '전체',
  manage: '경영대학',
  economic: '경제통상대학',
  engineer: '공과대학',
  royal: '법과대학',
  social: '사회과학대학',
  human: '인문대학',
  natural: '자연과학대학',
  it: 'IT대학',
  free: '융합특성화자유전공학부',
};

export const collegeSubCategoryToCode: Record<string, string> = {
  all: '',
  manage: '경영대학',
  economic: '경제통상대학',
  engineer: '공과대학',
  royal: '법과대학',
  social: '사회과학대학',
  human: '인문대학',
  natural: '자연과학대학',
  it: 'IT대학',
  free: '융합특성화자유전공학부',
};

export const reverseCollegeSubCategoryMap: Record<string, string> = {
  전체: 'all',
  경영대학: 'manage',
  경제통상대학: 'economic',
  공과대학: 'engineer',
  법과대학: 'royal',
  사회과학대학: 'social',
  인문대학: 'human',
  자연과학대학: 'natural',
  IT대학: 'it',
  융합특성화자유전공학부: 'free',
};
