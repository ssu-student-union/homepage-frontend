import { useState } from 'react';

// 대분류, 중분류, 소분류 상태 훅
export function useDataCategory() {
  const [majorCategory, setMajor] = useState<string | null>(null); // 대분류 선택 상태
  const [middleCategory, setMiddle] = useState<string | null>(null); // 중분류 선택 상태
  const [subCategory, setSub] = useState<string | null>(null); // 소분류 선택 상태Z

  return {
    majorCategory,
    middleCategory,
    subCategory,
    setMajor,
    setMiddle,
    setSub,
  };
}
