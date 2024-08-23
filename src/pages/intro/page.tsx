import { useSearchParams, useNavigate } from 'react-router-dom';
import IntroEditButton from './container/IntroEditButton';
import IntroContentSection from './container/IntroContentSection';
import { HeadLayout } from '@/template/HeadLayout';
import { useBoardSelect } from '@/hooks/useBoardSelect';
import { useValidateAndRedirect } from './container/hooks/useValidateAndRedirect';
import { useCategoryMap } from './container/hooks/useQueryMap';
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

  if (!isValidCategory || !isValidSubCategory) {
    return null;
  }

  const { selectedSubcategories, onSubcategorySelect } = useBoardSelect<string>(categoryParam);
  const { selectedSubcategories: selectedSubcategory, onSubcategorySelect: onSubSelect } =
    useBoardSelect<string>(subCategoryParam);

  const { mainCategoryName, subCategoryDisplayName, handleSelection } = useCategoryMap({
    categoryParam,
    subCategoryParam,
    onSubcategorySelect,
    onSubSelect,
    setSearchParams,
    navigate,
  });

  return (
    <>
      <HeadLayout
        className="px-[200px] xs:px-[30px] sm:px-[30px] md:px-[60px] lg:px-[200px]"
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
      />
      <IntroContentSection category={categoryParam} subCategory={subCategoryParam} />
      <IntroEditButton />
    </>
  );
}
