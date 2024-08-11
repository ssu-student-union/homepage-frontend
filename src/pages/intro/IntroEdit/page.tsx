import { State } from '@/containers/common/Header/const/state';
import { Header } from '@/containers/common/Header/Header';
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
      <Header state={State.Login} />
      <IntroEditTitleSection category={category!} subCategory={subCategory!} />
      <IntroEditFileSection category={category!} subCategory={subCategory!} />
    </>
  );
}
