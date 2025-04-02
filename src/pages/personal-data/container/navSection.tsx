import { BoardNavigator } from '@/components/Board/BoardNavigator';
import { cn } from '@/libs/utils';
import { mainName } from '../const/data';

interface NavSectionProps {
  onCategoryChange: (category: string) => void;
  selectedCategoryIndex: number;
  className?: string;
  isHidden?: boolean;
}

export function NavSection({
  onCategoryChange,
  selectedCategoryIndex,
  className = '',
  isHidden = true,
}: NavSectionProps) {
  return (
    <>
      <div className={isHidden ? 'relative hidden md:block' : 'relative'}>
        <div className="absolute left-0 top-1/2 z-0 h-[1px] w-full -translate-y-1/2 transform bg-[#E7E7E7]"></div>
        <BoardNavigator
          categories={mainName}
          selectedCategory={mainName[selectedCategoryIndex]}
          onCategorySelect={(selectedCategory) => {
            onCategoryChange(selectedCategory);
          }}
          className={cn(`relative z-10 mx-[60px] bg-white lg:mx-[200px]`, className)}
        />
      </div>
    </>
  );
}
