import { BoardNavigator } from '@/components/Board/BoardNavigator';
import { BoardSelector } from '@/components/Board/BoardSelector';
import { category, mainName, subCategory, subName } from './const/data';
import { useAuditSwitch } from './utils/switchUtils';

interface IntroNavSectionProps {
  categoryParam: string;
  subCategoryParam: string;
  handleSelection: (selectedCategory: string, selectedSubcategory?: string) => void;
  mainCategoryName: string;
  subCategoryDisplayName: string;
}

export function IntroNavSection({
  categoryParam,
  subCategoryParam,
  handleSelection,
  mainCategoryName,
  subCategoryDisplayName,
}: IntroNavSectionProps) {
  const handleAuditSwitchClick = useAuditSwitch();

  const auditCategories = ['소개', '게시판'];
  const auditSelectedCategory = subCategoryParam === 'intro' ? '소개' : '게시판';

  return (
    <>
      <div className="relative xs:hidden sm:hidden">
        <div className="absolute left-0 top-1/2 z-0 h-[1px] w-full -translate-y-1/2 transform bg-[#E7E7E7]"></div>
        <BoardNavigator
          categories={categoryParam === 'audit' ? auditCategories : mainName}
          selectedCategory={categoryParam === 'audit' ? auditSelectedCategory : mainCategoryName}
          onCategorySelect={(selectedCategory) => {
            if (categoryParam === 'audit') {
              const selectedCategoryIndex = auditCategories.indexOf(selectedCategory);
              handleAuditSwitchClick(selectedCategoryIndex);
            } else {
              const selectedCategoryIndex = mainName.indexOf(selectedCategory);
              const categoryQueryParam = category[selectedCategoryIndex];
              handleSelection(categoryQueryParam);
            }
          }}
          className="relative z-10 mx-[200px] bg-white md:mx-[60px]"
        />
        <div className="pt-[32px]" />
      </div>
      {categoryParam !== 'audit' && (
        <BoardSelector
          className="px-[200px] xs:px-[30px] sm:px-[30px] md:px-[60px]"
          subcategories={subName}
          selectedSubcategory={subCategoryDisplayName}
          onSubcategorySelect={(subcategory) => {
            const selectedSubCategoryIndex = subName.indexOf(subcategory);
            const subCategoryQueryParam = subCategory[selectedSubCategoryIndex];
            handleSelection(categoryParam, subCategoryQueryParam);
          }}
        />
      )}
    </>
  );
}
