import { BoardNavigator } from '@/components/Board/BoardNavigator';
import { cn } from '@/libs/utils';

interface NoticeNavSectionProps {
  categoryParam: string;
  subCategoryParam: string;
  handleSelection: (selectedCategory: string) => void;
  mainCategoryName: string;
  className?: string;
  isHidden?: boolean;
}

export function NoticeNavSection({
  categoryParam,
  handleSelection,
  className = '',
  isHidden = true,
}: NoticeNavSectionProps) {
  const noticeCategories = ['중앙', '단과대'];
  const selectedCategory = categoryParam;

  return (
    <>
      <div className={isHidden ? 'relative xs:hidden sm:hidden' : 'relative'}>
        <div className="absolute left-0 top-1/2 z-0 h-[1px] w-full -translate-y-1/2 transform bg-[#E7E7E7]"></div>
        <BoardNavigator
          categories={noticeCategories}
          selectedCategory={selectedCategory}
          onCategorySelect={(selectedCategory) => {
            handleSelection(selectedCategory);
          }}
          className={cn(`relative z-0 mx-[200px] bg-white md:mx-[60px]`, className)}
        />
      </div>
    </>
  );
}
