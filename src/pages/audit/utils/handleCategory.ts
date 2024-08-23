import { NavigateFunction } from 'react-router-dom';

export function handleCategory(
  categories: string[],
  categoryValues: string[],
  selectedCategory: string,
  navigate: NavigateFunction
) {
  const categoryIndex = categories.indexOf(selectedCategory);
  const value = categoryValues[categoryIndex];
  navigate(`/audit?category=${value}`);
}
