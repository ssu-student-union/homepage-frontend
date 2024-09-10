import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  categoryMap,
  reverseCategoryMap,
  subCategoryMap,
  reverseSubCategoryMap,
  collegeSubCategoryMap,
  reverseCollegeSubCategoryMap,
} from '../const/data';

export function useNoticeCategory() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const urlCategory = searchParams.get('category') || 'central';
  const urlSubCategory = searchParams.get('sub-category') || 'all';

  const [category, setCategory] = useState<string>(urlCategory);
  const [subCategory, setSubCategory] = useState<string>(urlSubCategory);

  useEffect(() => {
    setCategory(urlCategory);
    setSubCategory(urlSubCategory);
  }, [urlCategory, urlSubCategory]);

  const handleCategoryChange = (newCategory: string) => {
    const englishCategory = reverseCategoryMap[newCategory];
    setSearchParams({ category: englishCategory, 'sub-category': subCategory });
  };

  const handleSubCategoryChange = (selectedSubcategory: string) => {
    const englishSubCategory =
      category === 'college'
        ? reverseCollegeSubCategoryMap[selectedSubcategory]
        : reverseSubCategoryMap[selectedSubcategory];
    setSubCategory(englishSubCategory);
    setSearchParams({ category, 'sub-category': englishSubCategory });
  };

  return {
    category: categoryMap[category],
    subCategory: category === 'college' ? collegeSubCategoryMap[subCategory] : subCategoryMap[subCategory],
    handleCategoryChange,
    handleSubCategoryChange,
    navigate,
    urlCategory,
    urlSubCategory,
  };
}
