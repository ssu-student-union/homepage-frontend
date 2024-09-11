import { NavigateFunction } from 'react-router-dom';
import { category, mainName } from '../const/data';

interface UseCategoryProps {
  setSearchParams: (params: any) => void;
  navigate: NavigateFunction;
}

export const useCategory = ({ setSearchParams, navigate }: UseCategoryProps) => {
  const handleSelection = (selectedCategory: string) => {
    const selectedCategoryIndex = mainName.indexOf(selectedCategory);

    if (selectedCategoryIndex !== -1) {
      const selectedCategoryParam = category[selectedCategoryIndex];
      setSearchParams({ category: selectedCategoryParam });
      navigate(`/personal-data?category=${selectedCategoryParam}`);
    } else {
      console.error('Invalid category selected');
    }
  };

  return {
    handleSelection,
  };
};
