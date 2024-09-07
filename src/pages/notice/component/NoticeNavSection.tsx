import { BoardNavigator } from '@/components/Board/BoardNavigator';
import { BoardSelector } from '@/components/Board/BoardSelector';
import { category, mainName, subCategory, subName } from '../const/data';
import { useNoticeSwitch } from '../utils/switchUtils';
import { cn } from '@/libs/utils';

interface NoticeNavSectionProps {
  categoryParam: string;
  subCategoryParam: string;
  handleSelection: (selectedCategory: string, selectedSubcategory?: string) => void;
  mainCategoryName: string;
  subCategoryDisplayName: string;
  className?: string;
  isHidden?: boolean;
}

export function NoticeNavSection({
  categoryParam,
  subCategoryParam,
  handleSelection,
  mainCategoryName,
  subCategoryDisplayName,
  className = '',
  isHidden = true,
}: NoticeNavSectionProps) {
  const handleNoticeSwitchClick = useNoticeSwitch();

  const noticeCategories = ['중앙', '단과대'];
  const noticeSelectedCategory = subCategoryParam === 'intro' ? '중앙' : '단과대';

  return (
    <>
      <div className={isHidden ? 'relative xs:hidden sm:hidden' : 'relative'}>
        <div className="absolute left-0 top-1/2 z-0 h-[1px] w-full -translate-y-1/2 transform bg-[#E7E7E7]"></div>
        <BoardNavigator
          categories={categoryParam === 'notice' ? noticeCategories : mainName}
          selectedCategory={categoryParam === 'notice' ? noticeSelectedCategory : mainCategoryName}
          onCategorySelect={(selectedCategory) => {
            if (categoryParam === 'notice') {
              const selectedCategoryIndex = noticeCategories.indexOf(selectedCategory);
              handleNoticeSwitchClick(selectedCategoryIndex);
            } else {
              const selectedCategoryIndex = mainName.indexOf(selectedCategory);
              const categoryQueryParam = category[selectedCategoryIndex];
              handleSelection(categoryQueryParam);
            }
          }}
          className={cn(`relative z-10 mx-[200px] bg-white md:mx-[60px]`, className)}
        />
      </div>
      {categoryParam !== 'notice' && (
        <BoardSelector
          className="px-[200px] pt-[32px] xs:px-[30px] xs:pt-0 sm:px-[30px] sm:pt-0 md:px-[60px]"
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
