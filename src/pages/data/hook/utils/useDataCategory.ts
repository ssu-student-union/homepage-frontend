import { useState } from 'react';
import { CATEGORIES } from '@/pages/data/const/category';

// 대분류, 중분류, 소분류 상태 관리 훅
export function useDataCategory() {
  const [majorCategory, setMajor] = useState<string>(''); // 대분류 선택 상태
  const [middleCategory, setMiddle] = useState<string>(''); // 중분류 선택 상태
  const [subCategory, setSub] = useState<string>(''); // 소분류 선택 상태

  return {
    majorCategory,
    middleCategory,
    subCategory,
    setMajor,
    setMiddle,
    setSub,
  };
}

// localStorage의 memberName, majorName으로 API 파라미터 결정
export function resolveDataCategories(
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
