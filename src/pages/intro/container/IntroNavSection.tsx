import { BoardNavigator } from '@/components/Board/BoardNavigator';
import { BoardSelector } from '@/components/Board/BoardSelector';
import { category, mainName, subCategory, subName } from './const/data';
import { useAuditSwitch } from './utils/switchUtils';
import { cn } from '@/libs/utils';

interface IntroNavSectionProps {
  categoryParam: string;
  subCategoryParam: string;
  handleSelection: (selectedCategory: string, selectedSubcategory?: string) => void;
  mainCategoryName: string;
  subCategoryDisplayName: string;
  className?: string;
  isHidden?: boolean;
}

export function IntroNavSection({
  categoryParam,
  subCategoryParam,
  handleSelection,
  mainCategoryName,
  subCategoryDisplayName,
  className = '',
  isHidden = true,
}: IntroNavSectionProps) {
  const handleAuditSwitchClick = useAuditSwitch();

  const auditCategories = ['소개', '게시판'];
  const auditSelectedCategory = subCategoryParam === 'intro' ? '소개' : '게시판';

  return (
    <>
      <div className={isHidden ? 'relative hidden md:block' : 'relative'}>
        <div className="absolute left-0 top-1/2 z-0 h-px w-full -translate-y-1/2 bg-[#E7E7E7]"></div>
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
          className={cn(`relative z-10 mx-[60px] bg-white lg:mx-[200px]`, className)}
        />
      </div>
      {categoryParam !== 'audit' && (
        <BoardSelector
          className="px-[30px] pt-0 md:px-[60px] md:pt-[32px] lg:px-[200px]"
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
