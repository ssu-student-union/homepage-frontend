import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { categoryMap, reverseCategoryMap, subCategoryMap, reverseSubCategoryMap } from '../const/data';

export function useNoticeCategory() {
  const { category: urlCategory, subCategory: urlSubCategory } = useParams();
  const navigate = useNavigate();

  const [category, setCategory] = useState<string>(urlCategory || 'central');
  const [subCategory, setSubCategory] = useState<string>(urlSubCategory || 'all');

  useEffect(() => {
    if (urlCategory) setCategory(urlCategory);
    if (urlSubCategory) setSubCategory(urlSubCategory);
  }, [urlCategory, urlSubCategory]);

  const handleCategoryChange = (newCategory: string) => {
    const englishCategory = reverseCategoryMap[newCategory];
    setCategory(englishCategory);
    navigate(`/notice?category=${englishCategory}&sub-category=${subCategory}`);
  };

  const handleSubCategoryChange = (selectedSubcategory: string) => {
    const englishSubCategory = reverseSubCategoryMap[selectedSubcategory];
    setSubCategory(englishSubCategory);
    navigate(`/notice?category=${category}&sub-category=${englishSubCategory}`);
  };

  return {
    category: categoryMap[category],
    subCategory: subCategoryMap[subCategory],
    handleCategoryChange,
    handleSubCategoryChange,
    navigate,
  };
}
