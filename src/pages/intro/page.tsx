import { Header } from '@/containers/common/Header/Header';
import { State } from '@/containers/common/Header/const/state';
import { useSearchParams } from 'react-router-dom';
import { useValidateAndRedirect } from './container/hooks/useValidateAndRedirect';
import IntroTitleSection from './container/IntroTitleSection';
import IntroNavSection from './container/IntroNavSection';
import IntroContentSection from './container/IntroContentSection';

export function IntroPage() {
  const [searchParams] = useSearchParams();

  const category = searchParams.get('category') || '';
  const subCategory = searchParams.get('sub-category') || '';

  const { isValidCategory, isValidSubCategory } = useValidateAndRedirect({ category, subCategory });

  if (!isValidCategory || !isValidSubCategory) {
    return null;
  }

  return (
    <>
      <Header state={State.Logout} />
      <IntroTitleSection category={category} />
      <IntroNavSection />
      <IntroContentSection category={category} subCategory={subCategory} />
      {/*<IntroEditButton /> API 개발 후 추가*/}
    </>
  );
}
