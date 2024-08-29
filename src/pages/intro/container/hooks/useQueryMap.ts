import { NavigateFunction } from 'react-router-dom';
import { category, mainName, subCategory, subName } from '../const/data';

interface UseCategoryMapProps {
  categoryParam: string;
  subCategoryParam: string;
  onSubcategorySelect: (category: string) => void;
  onSubSelect: (subcategory: string) => void;
  setSearchParams: (params: any) => void;
  navigate: NavigateFunction;
}

export const useCategoryMap = ({
  categoryParam,
  subCategoryParam,
  onSubcategorySelect,
  onSubSelect,
  setSearchParams,
  navigate,
}: UseCategoryMapProps) => {
  const categoryIndex = category.indexOf(categoryParam);
  const mainCategoryName = categoryIndex !== -1 ? mainName[categoryIndex] : '';

  const subCategoryIndex = subCategory.indexOf(subCategoryParam);
  const subCategoryDisplayName = subCategoryIndex !== -1 ? subName[subCategoryIndex] : '';

  const handleSelection = (selectedCategory: string, selectedSubcategory?: string) => {
    onSubcategorySelect(selectedCategory);

    if (selectedSubcategory) {
      onSubSelect(selectedSubcategory);
      setSearchParams({ category: selectedCategory, 'sub-category': selectedSubcategory });
      navigate(`/homepage-frontend/intro?category=${selectedCategory}&sub-category=${selectedSubcategory}`);
    } else {
      setSearchParams({ category: selectedCategory });
      navigate(`/homepage-frontend/intro?category=${selectedCategory}&sub-category=intro`);
    }
  };

  return {
    mainCategoryName,
    subCategoryDisplayName,
    handleSelection,
  };
};
