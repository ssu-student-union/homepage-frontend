import { BoardNavigator } from '@/components/Board/BoardNavigator';
import { useNoticeSwitch } from '../utils/switchUtils';
import { cn } from '@/libs/utils';
import { reverseCategoryMap } from '../const/data';

interface NoticeNavSectionProps {
  categoryParam: string;
  subCategoryParam: string;
  handleSelection: (selectedCategory: string) => void;
  mainCategoryName: string;
  subCategoryDisplayName: string;
  className?: string;
  isHidden?: boolean;
}

export function NoticeNavSection({
  categoryParam,
  handleSelection,
  className = '',
  isHidden = true,
}: NoticeNavSectionProps) {
  const handleNoticeSwitchClick = useNoticeSwitch();

  const noticeCategories = ['중앙', '단과대']; // 사용자에게 보여줄 한글 카테고리
  const selectedCategory = categoryParam; // 선택된 카테고리 (한글)

  return (
    <>
      <div className={isHidden ? 'relative xs:hidden sm:hidden' : 'relative'}>
        <div className="absolute left-0 top-1/2 z-0 h-[1px] w-full -translate-y-1/2 transform bg-[#E7E7E7]"></div>
        <BoardNavigator
          categories={noticeCategories} // 사용자에게 한글로 카테고리 표시
          selectedCategory={selectedCategory} // 선택된 카테고리 반영
          onCategorySelect={(selectedCategory) => {
            handleNoticeSwitchClick(noticeCategories.indexOf(selectedCategory)); // 스위치 토글
            handleSelection(selectedCategory); // 카테고리 변경
          }}
          className={cn(`relative z-10 mx-[200px] bg-white md:mx-[60px]`, className)}
        />
      </div>
    </>
  );
}
