// 대분류
export const majorOptions: string[] = [
  '총학생회',
  '선거관리위원회',
  '감사기구',
  '경영대학',
  '경제통상대학',
  '공과대학',
  '법과대학',
  '사회과학대학',
  '인문대학',
  '자연과학대학',
  'IT대학',
  '베어드학부대학',
  '융합특성화자유전공학부',
  '차세대반도체학과',
  '동아리연합회',
] as const;
// 중분류
export const middleOptions: Record<string, string[]> = {
  총학생회: ['학생총회', '전체학생대표자회의', '확대운영위원회', '중앙운영위원회', '중앙집행위원회', '특별기구'],
  선거관리위원회: [
    '중앙선거관리위원회',
    '경영대학',
    '경제통상대학',
    '공과대학',
    '법과대학',
    '사회과학대학',
    '인문대학',
    'IT대학',
    '동아리연합회',
    '자연과학대학',
  ],
  감사기구: [
    '중앙감사위원회',
    '자연과학대학 감사위원회',
    'IT대학 감사위원회',
    '경영대학 감사위원회',
    '경제통상대학 감사위원회',
    '공과대학 감사위원회',
    '법과대학 감사위원회',
    '사회과학대학 감사위원회',
    '인문대학 감사위원회',
  ],
  경영대학: ['경영대학', '경영학부', '벤처중소기업학과', '회계학과', '금융학부'],
  경제통상대학: ['경제통상대학', '경제학과', '글로벌통상학과', '금융경제학과', '국제무역학과'],
  공과대학: ['공과대학', '화학공학과', '신소재공학과', '전기공학부', '기계공학부', '산업정보시스템공학과', '건축학부'],
  법과대학: ['법과대학', '법학과', '국제법무학과'],
  사회과학대학: [
    '사회과학대학',
    '사회복지학부',
    '행정학부',
    '정치외교학과',
    '정보사회학과',
    '언론홍보학과',
    '평생교육학과',
  ],
  인문대학: [
    '인문대학',
    '기독교학과',
    '국어국문학과',
    '영어영문학과',
    '독어독문학과',
    '불어불문학과',
    '중어중문학과',
    '일어일문학과',
    '철학과',
    '사학과',
    '문예창작전공',
    '영화예술전공',
    '스포츠학부',
  ],
  자연과학대학: ['자연과학대학', '수학과', '물리학과', '화학과', '정보통계보험수리학과', '의생명시스템학부'],
  IT대학: [
    'IT대학',
    '컴퓨터학부',
    '전자정보공학부',
    '글로벌미디어학부',
    '소프트웨어학부',
    'AI융합학부',
    '미디어경영학과',
  ],
  베어드학부대학: ['자유전공학부'],
  융합특성화자유전공학부: ['융합특성화자유전공학부'],
  차세대반도체학과: ['차세대반도체학과'],
  동아리연합회: ['동아리연합회'],
};
//소분류
export const minorOptions: Record<string, string[]> = {
  학생총회: ['결과보고'],
  전체학생대표자회의: ['결과보고'],
  확대운영위원회: ['결과보고'],
  중앙운영위원회: ['회의록', '총학생회칙'],
  중앙집행위원회: ['결산안', '활동보고'],
  특별기구: ['특별기구 운영세칙', '학생복지위원회', '인권위원회', '교지편집위원회', 'IT지원위원회'],
  중앙선거관리위원회: ['선거시행세칙', '선거세부지침서', '특별선거시행세칙'],
  IT대학선거관리위원회: ['선거시행세칙', '선거세부지침서', '특별선거시행세칙'],
  경영대학선거관리위원회: ['선거시행세칙', '선거세부지침서', '특별선거시행세칙'],
  경제통상대학선거관리위원회: ['선거시행세칙', '선거세부지침서', '특별선거시행세칙'],
  공과대학선거관리위원회: ['선거시행세칙', '선거세부지침서', '특별선거시행세칙'],
  법과대학선거관리위원회: ['선거시행세칙', '선거세부지침서', '특별선거시행세칙'],
  사회과학대학선거관리위원회: ['선거시행세칙', '선거세부지침서', '특별선거시행세칙'],
  인문대학선거관리위원회: ['선거시행세칙', '선거세부지침서', '특별선거시행세칙'],
  자연과학대학선거관리위원회: ['선거시행세칙', '선거세부지침서', '특별선거시행세칙'],
  동아리연합회선거관리위원회: ['선거시행세칙', '선거세부지침서', '특별선거시행세칙'],
  중앙감사위원회: ['감사시행세칙', '회계지침서', '감사결과보고서', '회의록', '회계교육자료'],
  경영대학_감사위원회: ['감사시행세칙', '회계지침서', '감사결과보고서', '회의록'],
  경제통상대학_감사위원회: ['감사시행세칙', '회계지침서', '감사결과보고서', '회의록'],
  공과대학_감사위원회: ['감사시행세칙', '회계지침서', '감사결과보고서', '회의록'],
  법과대학_감사위원회: ['감사시행세칙', '회계지침서', '감사결과보고서', '회의록'],
  사회과학대학_감사위원회: ['감사시행세칙', '회계지침서', '감사결과보고서', '회의록'],
  인문대학_감사위원회: ['감사시행세칙', '회계지침서', '감사결과보고서', '회의록'],
  자연과학대학_감사위원회: ['감사시행세칙', '회계지침서', '감사결과보고서', '회의록'],
  IT대학_감사위원회: ['감사시행세칙', '회계지침서', '감사결과보고서', '회의록'],
  경영대학: ['회칙 세칙', '회의록', '예·결산안', '활동보고', '대표자회의결과보고'],
  경영학부: ['회칙 세칙', '회의록', '예·결산안', '활동보고'],
  벤처중소기업학과: ['회칙 세칙', '회의록', '예·결산안', '활동보고'],
  회계학과: ['회칙 세칙', '회의록', '예·결산안', '활동보고'],
  금융학부: ['회칙 세칙', '회의록', '예·결산안', '활동보고'],
  경제통상대학: ['회칙 세칙', '회의록', '예·결산안', '활동보고', '대표자회의결과보고'],
  경제학과: ['회칙 세칙', '회의록', '예·결산안', '활동보고'],
  글로벌통상학과: ['회칙 세칙', '회의록', '예·결산안', '활동보고'],
  금융경제학과: ['회칙 세칙', '회의록', '예·결산안', '활동보고'],
  국제무역학과: ['회칙 세칙', '회의록', '예·결산안', '활동보고'],
  공과대학: ['회칙 세칙', '회의록', '예·결산안', '활동보고', '대표자회의결과보고'],
  화학공학과: ['회칙 세칙', '회의록', '예·결산안', '활동보고'],
  신소재공학과: ['회칙 세칙', '회의록', '예·결산안', '활동보고'],
  전기공학부: ['회칙 세칙', '회의록', '예·결산안', '활동보고'],
  기계공학부: ['회칙 세칙', '회의록', '예·결산안', '활동보고'],
  산업정보시스템공학과: ['회칙 세칙', '회의록', '예·결산안', '활동보고'],
  건축학부: ['회칙 세칙', '회의록', '예·결산안', '활동보고'],
  법과대학: ['회칙 세칙', '회의록', '예·결산안', '활동보고', '대표자회의결과보고'],
  법학과: ['회칙 세칙', '회의록', '예·결산안', '활동보고'],
  국제법무학과: ['회칙 세칙', '회의록', '예·결산안', '활동보고'],
  사회과학대학: ['회칙 세칙', '회의록', '예·결산안', '활동보고', '대표자회의결과보고'],
  사회복지학부: ['회칙 세칙', '회의록', '예·결산안', '활동보고'],
  행정학부: ['회칙 세칙', '회의록', '예·결산안', '활동보고'],
  정치외교학과: ['회칙 세칙', '회의록', '예·결산안', '활동보고'],
  정보사회학과: ['회칙 세칙', '회의록', '예·결산안', '활동보고'],
  언론홍보학과: ['회칙 세칙', '회의록', '예·결산안', '활동보고'],
  평생교육학과: ['회칙 세칙', '회의록', '예·결산안', '활동보고'],
  인문대학: ['회칙 세칙', '회의록', '예·결산안', '활동보고', '대표자회의결과보고'],
  기독교학과: ['회칙 세칙', '회의록', '예·결산안', '활동보고'],
  국어국문학과: ['회칙 세칙', '회의록', '예·결산안', '활동보고'],
  영어영문학과: ['회칙 세칙', '회의록', '예·결산안', '활동보고'],
  독어독문학과: ['회칙 세칙', '회의록', '예·결산안', '활동보고'],
  불어불문학과: ['회칙 세칙', '회의록', '예·결산안', '활동보고'],
  중어중문학과: ['회칙 세칙', '회의록', '예·결산안', '활동보고'],
  일어일문학과: ['회칙 세칙', '회의록', '예·결산안', '활동보고'],
  철학과: ['회칙 세칙', '회의록', '예·결산안', '활동보고'],
  사학과: ['회칙 세칙', '회의록', '예·결산안', '활동보고'],
  문예창작전공: ['회칙 세칙', '회의록', '예·결산안', '활동보고'],
  영화예술전공: ['회칙 세칙', '회의록', '예·결산안', '활동보고'],
  스포츠학부: ['회칙 세칙', '회의록', '예·결산안', '활동보고'],
  자연과학대학: ['회칙 세칙', '회의록', '예·결산안', '활동보고', '대표자회의결과보고'],
  수학과: ['회칙 세칙', '회의록', '예·결산안', '활동보고'],
  물리학과: ['회칙 세칙', '회의록', '예·결산안', '활동보고'],
  화학과: ['회칙 세칙', '회의록', '예·결산안', '활동보고'],
  정보통계보험수리학과: ['회칙 세칙', '회의록', '예·결산안', '활동보고'],
  의생명시스템학부: ['회칙 세칙', '회의록', '예·결산안', '활동보고'],
  IT대학: ['회칙 세칙', '회의록', '예·결산안', '활동보고', '대표자회의결과보고'],
  컴퓨터학부: ['회칙 세칙', '회의록', '예·결산안', '활동보고'],
  전자정보공학부: ['회칙 세칙', '회의록', '예·결산안', '활동보고'],
  글로벌미디어학부: ['회칙 세칙', '회의록', '예·결산안', '활동보고'],
  소프트웨어학부: ['회칙 세칙', '회의록', '예·결산안', '활동보고'],
  AI융합학부: ['회칙 세칙', '회의록', '예·결산안', '활동보고'],
  미디어경영학과: ['회칙 세칙', '회의록', '예·결산안', '활동보고'],
  자유전공학부: ['회칙 세칙', '회의록', '예·결산안', '활동보고'],
  융합특성화자유전공학부: ['회칙 세칙', '회의록', '예·결산안', '활동보고', '선거시행세칙'],
  차세대반도체학과: ['회칙 세칙', '회의록', '예·결산안', '활동보고'],
  동아리연합회: ['회칙 세칙', '회의록', '예·결산안', '활동보고', '대표자회의결과보고'],
} as const;

// 카테고리
interface UserCategories {
  [key: string]: string[];
}

export const userCategories: UserCategories = {
  중앙운영위원회: [
    '학생총회 결과보고',
    '전체학생대표자회의 결과보고',
    '확대운영위원회 결과보고',
    '중앙운영위원회 회의록',
    '총학생회칙',
    '특별기구 운영세칙',
  ],
  총학생회: ['결산안', '활동보고'],
  학생복지위원회: ['학생복지위원회'],
  인권위원회: ['인권위원회'],
  교지편집위원회: ['교지편집위원회'],
  IT지원위원회: ['IT지원위원회'],
  중앙선거관리위원회: ['중앙 선거시행세칙', '중앙 선거세부지침서', '중앙특별선거시행세칙'],
  경영대학선거관리위원회: ['경영대학 선거시행세칙', '경영대학 선거세부지침서', '경영대학 특별선거시행세칙'],
  경제통상대학선거관리위원회: [
    '경제통상대학 선거시행세칙',
    '경제통상대학 선거세부지침서',
    '경제통상대학 특별선거시행세칙',
  ],
  공과대학선거관리위원회: ['공과대학 선거시행세칙', '공과대학 선거세부지침서', '공과대학 특별선거시행세칙'],
  법과대학선거관리위원회: ['법과대학 선거시행세칙', '법과대학 선거세부지침서', '법과대학 특별선거시행세칙'],
  사회과학대학선거관리위원회: [
    '사회과학대학 선거시행세칙',
    '사회과학대학 선거세부지침서',
    '사회과학대학 특별선거시행세칙',
  ],
  인문대학선거관리위원회: ['인문대학 선거시행세칙', '인문대학 선거세부지침서', '인문대학 특별선거시행세칙'],
  자연과학대학선거관리위원회: [
    '자연과학대학 선거시행세칙',
    '자연과학대학 선거세부지침서',
    '자연과학대학 특별선거시행세칙',
  ],
  IT대학선거관리위원회: ['IT대학 선거시행세칙', 'IT대학 선거세부지침서', 'IT대학 특별선거시행세칙'],
  동아리연합회선거관리위원회: [
    '동아리연합회 선거시행세칙',
    '동아리연합회 선거세부지침서',
    '동아리연합회 특별선거시행세칙',
  ],
  중앙감사위원회: ['중앙 감사시행세칙', '중앙 회계지침서', '중앙 감사결과보고서', '중앙 감사회의록', '회계교육자료'],
  경영대학감사위원회: [
    '경영대학 감사시행세칙',
    '경영대학 회계지침서',
    '경영대학 감사결과보고서',
    '경영대학 감사회의록',
  ],
  경제통상대학감사위원회: [
    '경제통상대학 감사시행세칙',
    '경제통상대학 회계지침서',
    '경제통상대학 감사결과보고서',
    '경제통상대학 감사회의록',
  ],
  공과대학감사위원회: [
    '공과대학 감사시행세칙',
    '공과대학 회계지침서',
    '공과대학 감사결과보고서',
    '공과대학 감사회의록',
  ],
  법과대학감사위원회: [
    '법과대학 감사시행세칙',
    '법과대학 회계지침서',
    '법과대학 감사결과보고서',
    '법과대학 감사회의록',
  ],
  사회과학대학감사위원회: [
    '사회과학대학 감사시행세칙',
    '사회과학대학 회계지침서',
    '사회과학대학 감사결과보고서',
    '사회과학대학 감사회의록',
  ],
  인문대학감사위원회: [
    '인문대학 감사시행세칙',
    '인문대학 회계지침서',
    '인문대학 감사결과보고서',
    '인문대학 감사회의록',
  ],
  자연과학대학감사위원회: [
    '자연과학대학 감사시행세칙',
    '자연과학대학 회계지침서',
    '자연과학대학 감사결과보고서',
    '자연과학대학 감사회의록',
  ],
  IT대학감사위원회: ['IT대학 감사시행세칙', 'IT대학 회계지침서', 'IT대학 감사결과보고서', 'IT대학 감사회의록'],
  경영대학: [
    '경영대학 회칙 세칙',
    '경영대학 회의록',
    '경영대학 예·결산안',
    '경영대학 활동보고',
    '경영대학 대표자회의결과보고',
  ],
  경제통상대학: [
    '경제통상대학 회칙 세칙',
    '경제통상대학 회의록',
    '경제통상대학 예·결산안',
    '경제통상대학 활동보고',
    '경제통상대학 대표자회의결과보고',
  ],
  공과대학: [
    '공과대학 회칙 세칙',
    '공과대학 회의록',
    '공과대학 예·결산안',
    '공과대학 활동보고',
    '공과대학 대표자회의결과보고',
  ],
  법과대학: [
    '법과대학 회칙 세칙',
    '법과대학 회의록',
    '법과대학 예·결산안',
    '법과대학 활동보고',
    '법과대학 대표자회의결과보고',
  ],
  사회과학대학: [
    '사회과학대학 회칙 세칙',
    '사회과학대학 회의록',
    '사회과학대학 예·결산안',
    '사회과학대학 활동보고',
    '사회과학대학 대표자회의결과보고',
  ],
  인문대학: [
    '인문대학 회칙 세칙',
    '인문대학 회의록',
    '인문대학 예·결산안',
    '인문대학 활동보고',
    '인문대학 대표자회의결과보고',
  ],
  자연과학대학: [
    '자연과학대학 회칙 세칙',
    '자연과학대학 회의록',
    '자연과학대학 예·결산안',
    '자연과학대학 활동보고',
    '자연과학대학 대표자회의결과보고',
  ],
  IT대학: ['IT대학 회칙 세칙', 'IT대학 회의록', 'IT대학 예·결산안', 'IT대학 활동보고', 'IT대학 대표자회의결과보고'],
  베어드학부대학: [
    '베어드학부대학 회칙 세칙',
    '베어드학부대학 회의록',
    '베어드학부대학 예·결산안',
    '베어드학부대학 활동보고',
    '베어드학부대학 대표자회의결과보고',
  ],
  융합특성화자유전공학부: [
    '융합특성화자유전공학부 회칙 세칙',
    '융합특성화자유전공학부 회의록',
    '융합특성화자유전공학부 예·결산안',
    '융합특성화자유전공학부 활동보고',
    '융합특성화자유전공학부 대표자회의결과보고',
  ],
  동아리연합회: [
    '동아리연합회 회칙 세칙',
    '동아리연합회 회의록',
    '동아리연합회 예·결산안',
    '동아리연합회 활동보고',
    '동아리연합회 대표자회의결과보고',
  ],
  이외학과부: ['회칙 세칙', '회의록', '예·결산안', '활동보고'],
} as const;

// 파일종류
interface UserFileCategories extends UserCategories {}

export const userFileCategories: UserFileCategories = {
  중앙운영위원회: ['결과보고서', '회의록', '총학생회칙', '운영세칙', '자료'],
  총학생회: ['결산안', '활동보고', '자료'],
  학생복지위원회: ['특별기구 자료'],
  학생인권위원회: ['특별기구 자료'],
  교지편집위원회: ['특별기구 자료'],
  IT지원위원회: ['특별기구 자료'],
  중앙선거관리위원회: ['시행세칙', '지침서', '신구대조표', '자료'],
  경영대학선거관리위원회: ['시행세칙', '지침서', '신구대조표', '자료'],
  경제통상대학선거관리위원회: ['시행세칙', '지침서', '신구대조표', '자료'],
  자연과학대학선거관리위원회: ['시행세칙', '지침서', '신구대조표', '자료'],
  공과대학선거관리위원회: ['시행세칙', '지침서', '신구대조표', '자료'],
  법과대학선거관리위원회: ['시행세칙', '지침서', '신구대조표', '자료'],
  사회과학선거관리위원회: ['시행세칙', '지침서', '신구대조표', '자료'],
  인문대학선거관리위원회: ['시행세칙', '지침서', '신구대조표', '자료'],
  IT대학선거관리위원회: ['시행세칙', '지침서', '신구대조표', '자료'],
  동아리연합회선거관리위원회: ['시행세칙', '지침서', '신구대조표', '자료'],
  중앙감사위원회: ['자료'],
  경영대학감사위원회: ['시행세칙', '지침서', '결과보고서', '회의록', '자료'],
  경제통상대학감사위원회: ['시행세칙', '지침서', '결과보고서', '회의록', '자료'],
  공과대학감사위원회: ['시행세칙', '지침서', '결과보고서', '회의록', '자료'],
  법과대학감사위원회: ['시행세칙', '지침서', '결과보고서', '회의록', '자료'],
  사회과학대학감사위원회: ['시행세칙', '지침서', '결과보고서', '회의록', '자료'],
  인문대학감사위원회: ['시행세칙', '지침서', '결과보고서', '회의록', '자료'],
  자연과학감사위원회: ['시행세칙', '지침서', '결과보고서', '회의록', '자료'],
  IT대학감사위원회: ['시행세칙', '지침서', '결과보고서', '회의록', '자료'],
  경영대학: ['회칙 세칙', '회의록', '예·결산안', '활동보고', '결과보고서', '자료'],
  공과대학: ['회칙 세칙', '회의록', '예·결산안', '활동보고', '결과보고서', '자료'],
  법과대학: ['회칙 세칙', '회의록', '예·결산안', '활동보고', '결과보고서', '자료'],
  사회과학대학: ['회칙 세칙', '회의록', '예·결산안', '활동보고', '결과보고서', '자료'],
  인문대학: ['회칙 세칙', '회의록', '예·결산안', '활동보고', '결과보고서', '자료'],
  자연과학대학: ['회칙 세칙', '회의록', '예·결산안', '활동보고', '결과보고서', '자료'],
  IT대학: ['회칙 세칙', '회의록', '예·결산안', '활동보고', '결과보고서', '자료'],
  경제통상대학: ['회칙 세칙', '회의록', '예·결산안', '활동보고', '결과보고서', '자료'],
  베어드학부대학: ['회칙 세칙', '회의록', '예·결산안', '활동보고', '결과보고서', '자료'],
  융합특성화자유전공학부: ['회칙 세칙', '회의록', '예·결산안', '활동보고', '결과보고서', '자료'],
  경영학부: ['회칙 세칙', '회의록', '예·결산안', '활동보고', '자료'],
  벤처중소기업학과: ['회칙 세칙', '회의록', '예·결산안', '활동보고', '자료'],
  회계학과: ['회칙 세칙', '회의록', '예·결산안', '활동보고', '자료'],
  금융학부: ['회칙 세칙', '회의록', '예·결산안', '활동보고', '자료'],
  경제학과: ['회칙 세칙', '회의록', '예·결산안', '활동보고', '자료'],
  글로벌통상학과: ['회칙 세칙', '회의록', '예·결산안', '활동보고', '자료'],
  금융경제학과: ['회칙 세칙', '회의록', '예·결산안', '활동보고', '자료'],
  국제무역학과: ['회칙 세칙', '회의록', '예·결산안', '활동보고', '자료'],
  화학공학과: ['회칙 세칙', '회의록', '예·결산안', '활동보고', '자료'],
  신소재공학과: ['회칙 세칙', '회의록', '예·결산안', '활동보고', '자료'],
  전기공학부: ['회칙 세칙', '회의록', '예·결산안', '활동보고', '자료'],
  기계공학부: ['회칙 세칙', '회의록', '예·결산안', '활동보고', '자료'],
  산업정보시스템공학과: ['회칙 세칙', '회의록', '예·결산안', '활동보고', '자료'],
  건축학부: ['회칙 세칙', '회의록', '예·결산안', '활동보고', '자료'],
  법학과: ['회칙 세칙', '회의록', '예·결산안', '활동보고', '자료'],
  국제법무학과: ['회칙 세칙', '회의록', '예·결산안', '활동보고', '자료'],
  사회복지학부: ['회칙 세칙', '회의록', '예·결산안', '활동보고', '자료'],
  행정학부: ['회칙 세칙', '회의록', '예·결산안', '활동보고', '자료'],
  정치외교학과: ['회칙 세칙', '회의록', '예·결산안', '활동보고', '자료'],
  정보사회학과: ['회칙 세칙', '회의록', '예·결산안', '활동보고', '자료'],
  언론홍보학과: ['회칙 세칙', '회의록', '예·결산안', '활동보고', '자료'],
  평생교육학과: ['회칙 세칙', '회의록', '예·결산안', '활동보고', '자료'],
  기독교학과: ['회칙 세칙', '회의록', '예·결산안', '활동보고', '자료'],
  국어국문학과: ['회칙 세칙', '회의록', '예·결산안', '활동보고', '자료'],
  영어영문학과: ['회칙 세칙', '회의록', '예·결산안', '활동보고', '자료'],
  독어독문학과: ['회칙 세칙', '회의록', '예·결산안', '활동보고', '자료'],
  불어불문학과: ['회칙 세칙', '회의록', '예·결산안', '활동보고', '자료'],
  중어중문학과: ['회칙 세칙', '회의록', '예·결산안', '활동보고', '자료'],
  일어일문학과: ['회칙 세칙', '회의록', '예·결산안', '활동보고', '자료'],
  철학과: ['회칙 세칙', '회의록', '예·결산안', '활동보고', '자료'],
  사학과: ['회칙 세칙', '회의록', '예·결산안', '활동보고', '자료'],
  문예창작전공: ['회칙 세칙', '회의록', '예·결산안', '활동보고', '자료'],
  영화예술전공: ['회칙 세칙', '회의록', '예·결산안', '활동보고', '자료'],
  물리학과: ['회칙 세칙', '회의록', '예·결산안', '활동보고', '자료'],
  스포츠학부: ['회칙 세칙', '회의록', '예·결산안', '활동보고', '자료'],
  수학과: ['회칙 세칙', '회의록', '예·결산안', '활동보고', '자료'],
  화학과: ['회칙 세칙', '회의록', '예·결산안', '활동보고', '자료'],
  정보통계보험수리학과: ['회칙 세칙', '회의록', '예·결산안', '활동보고', '자료'],
  의생명시스템학부: ['회칙 세칙', '회의록', '예·결산안', '활동보고', '자료'],
  컴퓨터학부: ['회칙 세칙', '회의록', '예·결산안', '활동보고', '자료'],
  전자정보공학부: ['회칙 세칙', '회의록', '예·결산안', '활동보고', '자료'],
  글로벌미디어학부: ['회칙 세칙', '회의록', '예·결산안', '활동보고', '자료'],
  소프트웨어학부: ['회칙 세칙', '회의록', '예·결산안', '활동보고', '자료'],
  AI융합학부: ['회칙 세칙', '회의록', '예·결산안', '활동보고', '자료'],
  미디어경영학과: ['회칙 세칙', '회의록', '예·결산안', '활동보고', '자료'],
  자율전공학부: ['회칙 세칙', '회의록', '예·결산안', '활동보고', '자료'],
  차세대반도체학과: ['회칙 세칙', '회의록', '예·결산안', '활동보고', '자료'],
  동아리연합회: ['회칙 세칙', '회의록', '예·결산안', '활동보고', '자료'],
} as const;
