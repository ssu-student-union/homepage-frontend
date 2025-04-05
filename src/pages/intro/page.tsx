import { useSearchParams, useNavigate } from 'react-router';
import IntroContentSection from './container/IntroContentSection';
import { HeadLayout } from '@/template/HeadLayout';
import { useBoardSelect } from '@/hooks/useBoardSelect';
import { useValidateAndRedirect } from './container/hooks/useValidateAndRedirect';
import { useCategoryMap } from './container/hooks/useCategoryMap';
import { paramToHisNum, paramToName, paramToSubTitle, paramToTitle } from './container/utils/dataUtils';
import { IntroNavSection } from './container/IntroNavSection';

export function IntroPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const categoryParam = searchParams.get('category') || '';
  const subCategoryParam = searchParams.get('sub-category') || '';

  const { isValidCategory, isValidSubCategory } = useValidateAndRedirect({
    category: categoryParam,
    subCategory: subCategoryParam,
  });

  const { onSubcategorySelect } = useBoardSelect<string>(categoryParam);
  const { onSubcategorySelect: onSubSelect } = useBoardSelect<string>(subCategoryParam);

  const { mainCategoryName, subCategoryDisplayName, handleSelection } = useCategoryMap({
    categoryParam,
    subCategoryParam,
    onSubcategorySelect,
    onSubSelect,
    setSearchParams,
    navigate,
  });

  if (!isValidCategory || !isValidSubCategory) {
    return null;
  }

  return (
    <>
      <HeadLayout
        className={categoryParam === 'audit' ? 'px-[30px] xl:px-[200px]' : 'px-[30px] lg:px-[200px]'}
        searchHidden={true}
        borderOff={true}
        title={paramToTitle(categoryParam)}
        subtitle={`${paramToHisNum(categoryParam)} ${paramToSubTitle(categoryParam)} ${paramToName(categoryParam)}`}
      />
      <IntroNavSection
        categoryParam={categoryParam}
        subCategoryParam={subCategoryParam}
        handleSelection={handleSelection}
        mainCategoryName={mainCategoryName}
        subCategoryDisplayName={subCategoryDisplayName}
        isHidden={categoryParam === 'audit' ? false : true}
        className={categoryParam === 'audit' ? 'mx-[30px] xl:mx-[200px]' : ''}
      />
      <IntroContentSection category={categoryParam} subCategory={subCategoryParam} />
      {/* /intro/edit navigate 버튼 <IntroEditButton /> */}
    </>
  );
}
