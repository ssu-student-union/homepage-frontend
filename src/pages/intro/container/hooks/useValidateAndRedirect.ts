import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { category as validCategories, subCategory as validSubCategories } from '../const/data';

interface ValidateAndRedirectProps {
  category: string | null;
  subCategory: string | null;
}

export function useValidateAndRedirect({ category, subCategory }: ValidateAndRedirectProps) {
  const navigate = useNavigate();

  const isValidCategory = validCategories.includes(category!);
  const isValidSubCategory = validSubCategories.includes(subCategory!);

  useEffect(() => {
    if (!isValidCategory || !isValidSubCategory) {
      navigate('/intro?category=president&sub-category=intro', { replace: true });
    }
  }, [isValidCategory, isValidSubCategory, navigate]);

  return {
    isValidCategory,
    isValidSubCategory,
  };
}
