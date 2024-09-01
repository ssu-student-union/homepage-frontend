import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { category as validCategories, subCategory as validSubCategories, auditSubCategory } from '../const/data';

interface ValidateAndRedirectProps {
  category: string | null;
  subCategory: string | null;
}

export function useValidateAndRedirect({ category, subCategory }: ValidateAndRedirectProps) {
  const navigate = useNavigate();

  const combinedSubCategories = [...validSubCategories, ...auditSubCategory];

  const isValidCategory = validCategories.includes(category!);
  const isValidSubCategory = combinedSubCategories.includes(subCategory!);

  useEffect(() => {
    if (!isValidCategory || !isValidSubCategory) {
      navigate('/homepage-frontend/intro?category=president&sub-category=intro', { replace: true });
    }
  }, [isValidCategory, isValidSubCategory, navigate]);

  return {
    isValidCategory,
    isValidSubCategory,
  };
}
