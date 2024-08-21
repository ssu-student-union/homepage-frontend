import { useState } from 'react';

export const useBoardSelect = <T>(initialSelected: T) => {
  const [selectedSubcategories, setSelectedSubcategories] = useState<T>(initialSelected);

  const onSubcategorySelect = (category: T) => {
    setSelectedSubcategories(category);
  };

  return {
    selectedSubcategories,
    onSubcategorySelect,
  };
};
