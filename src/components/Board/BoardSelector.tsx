import { cn } from '@/libs/utils';
import { Category } from '../Category';
import { useTranslation } from 'react-i18next';

interface BoardSelectorProps<T> {
  subcategories: T[];
  selectedSubcategory: T;
  className?: string;
  onSubcategorySelect: (category: T) => void;
}

export function BoardSelector<T extends string>({
  subcategories,
  selectedSubcategory,
  className = '',
  onSubcategorySelect,
}: BoardSelectorProps<T>) {
  const { t } = useTranslation();
  return (
    <div className={cn(`flex flex-wrap gap-2`, className)}>
      {subcategories.map((category) => (
        <Category
          key={category as string}
          isActive={selectedSubcategory === category}
          onClick={() => onSubcategorySelect(category)}
        >
          {t(`board-selector.${category as string}`)}
        </Category>
      ))}
    </div>
  );
}

BoardSelector.Skeleton = () => {
  return (
    <div className={cn(`flex flex-wrap gap-2`)}>
      <Category.Skeleton />
      <Category.Skeleton />
    </div>
  );
};
