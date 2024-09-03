import { useSearchParams } from 'react-router-dom';
import { useValidateAndRedirect } from '../container/hooks/useValidateAndRedirect';
import { IntroEditTitleSection } from './container/IntroEditTitleSection';
import IntroEditFileSection from './container/IntroEditFileSection';

export function IntroEditPage() {
  const [searchParams] = useSearchParams();

  const category = searchParams.get('category');
  const subCategory = searchParams.get('sub-category');

  const { isValidCategory, isValidSubCategory } = useValidateAndRedirect({ category, subCategory });

  if (!isValidCategory || !isValidSubCategory) {
    return null;
  }

  return (
    <>
      <IntroEditTitleSection category={category!} subCategory={subCategory!} />
      <IntroEditFileSection category={category!} subCategory={subCategory!} />
    </>
  );
}
