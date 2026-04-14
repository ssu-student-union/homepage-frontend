import { CATEGORIES } from '@/pages/data/const/category';

// localStorage의 memberName, majorName으로 API 파라미터 결정
export function resolveUserRole(
  memberName: string,
  majorName: string
): {
  majorCategory: string;
  middleCategory: string;
} {
  const target = majorName || memberName;

  if (target === '총학생회') {
    return { majorCategory: '총학생회', middleCategory: '' };
  }

  // CATEGORIES에서 target이 속한 상위 카테고리 탐색
  for (const [major, middles] of Object.entries(CATEGORIES)) {
    if (target in middles) {
      // 자기 자신이 상위 카테고리인 경우 (ex. 경영대학 → 경영대학)
      if (major === target) {
        return { majorCategory: target, middleCategory: target };
      }
      return { majorCategory: major, middleCategory: target };
    }
  }

  // CATEGORIES에서 찾지 못한 경우 fallback
  return { majorCategory: target, middleCategory: target };
}
