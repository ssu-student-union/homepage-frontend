import { cn } from '@/libs/utils';
import { Category } from '../Category';

interface BoardSelectorProps<T> {
  subcategories: T[];
  selectedSubcategory: T;
  className?: string;
  onSubcategorySelect: (category: T) => void;
}

export function BoardSelector<T>({
  subcategories,
  selectedSubcategory,
  className = '',
  onSubcategorySelect,
}: BoardSelectorProps<T>) {
  return (
    <div className={cn(`flex flex-wrap gap-2`, className)}>
      {subcategories.map((category) => (
        <Category
          key={category as string}
          isActive={selectedSubcategory === category}
          onClick={() => onSubcategorySelect(category)}
        >
          {category as string}
        </Category>
      ))}
    </div>
  );
}
