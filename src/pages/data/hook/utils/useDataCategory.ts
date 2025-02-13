import { useState } from 'react';

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
