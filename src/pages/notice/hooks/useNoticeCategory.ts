import { useEffect, useState, useCallback } from 'react';
import { subName, subName2 } from '../const/data';
import { useSearchParams } from 'react-router-dom';

export function useNoticeCategory() {
  const [category, setCategory] = useState<string>('중앙');
  const [subCategory, setSubCategory] = useState<string>('전체');
  const [subCategorys, setSubCategorys] = useState<string[]>(subName);

  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');

  // ✅ handleCategoryChange를 useCallback으로 최적화
  const handleCategoryChange = useCallback((newCategory: string) => {
    setCategory(newCategory);
    setSubCategory('전체');
    setSubCategorys(newCategory === '중앙' ? subName : subName2);
  }, []);

  useEffect(() => {
    if (categoryParam) {
      handleCategoryChange(categoryParam);
    }

    // ✅ searchParams 조작도 useEffect 안에서 안전하게 처리
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);
      newParams.delete('category');
      return newParams;
    });
  }, [categoryParam, handleCategoryChange, setSearchParams]); // ✅ 의존성 배열 수정

  const handleSubCategoryChange = useCallback((newSubCategory: string) => {
    setSubCategory(newSubCategory);
  }, []);

  return {
    category,
    subCategory,
    subCategorys,
    handleCategoryChange,
    handleSubCategoryChange,
  };
}
