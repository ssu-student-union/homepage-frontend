import { useSearchParams } from 'react-router-dom';
import { useValidateAndRedirect } from './container/hooks/useValidateAndRedirect';
import IntroTitleSection from './container/IntroTitleSection';
import IntroNavSection from './container/IntroNavSection';
import IntroContentSection from './container/IntroContentSection';
import IntroEditButton from './container/IntroEditButton';
import { paramToHisNum, paramToName, paramToSubTitle, paramToTitle } from './container/utils/dataUtils';

// /intro
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
      <IntroTitleSection
        title={paramToTitle(category)}
        subTitle={`${paramToHisNum(category)} ${paramToSubTitle(category)} ${paramToName(category)}`}
      />
      <IntroNavSection category={category} />
      <IntroContentSection category={category} subCategory={subCategory} />
      <IntroEditButton />
    </>
  );
}
