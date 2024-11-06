import { useEffect, useState } from 'react';
import { subName, subName2 } from '../const/data';
import { useSearchParams } from 'react-router-dom';

export function useNoticeCategory() {
  const [category, setCategory] = useState<string>('중앙');
  const [subCategory, setSubCategory] = useState<string>('전체');
  const [subCategorys, setSubCategorys] = useState<string[]>(subName);

  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');

  useEffect(() => {
    if (categoryParam) {
      handleCategoryChange(categoryParam);
    }
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('category');
    setSearchParams(newParams);
  }, [categoryParam]);

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
