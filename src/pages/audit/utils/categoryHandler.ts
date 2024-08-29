import { NavigateFunction } from 'react-router-dom';
import { categoryMap } from '../const/data';

export function handleCategory(
  categories: string[],
  categoryValues: string[],
  selectedCategory: string,
  navigate: NavigateFunction
) {
  const categoryIndex = categories.indexOf(selectedCategory);
  const value = categoryValues[categoryIndex];
  navigate(`/homepage-frontend/audit?category=${value}`);
}

export function findCategoryKey(selectedCategory: string): string | undefined {
  return Object.keys(categoryMap).find((key) => categoryMap[key] === selectedCategory);
}
