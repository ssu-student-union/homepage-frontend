import { useState } from 'react';
import { subName, subName2 } from '../const/data';

export function useNoticeCategory() {
  const [category, setCategory] = useState<string>('중앙');
  const [subCategory, setSubCategory] = useState<string>('전체');
  const [subCategorys, setSubCategorys] = useState<string[]>(subName);

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
    setSubCategory('전체');
    handleSubCategorysChange(newCategory === '중앙' ? subName : subName2);
  };

  const handleSubCategoryChange = (newSubCategory: string) => {
    setSubCategory(newSubCategory);
  };

  const handleSubCategorysChange = (newSubCategorys: string[]) => {
    setSubCategorys(newSubCategorys);
  };

  return {
    category,
    subCategory,
    subCategorys,
    handleCategoryChange,
    handleSubCategoryChange,
    handleSubCategorysChange,
  };
}
