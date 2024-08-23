import { Category } from '../Category';

interface BoardSelectorProps<T> {
  subcategories: T[];
  selectedSubcategory: T;
  onSubcategorySelect: (category: T) => void;
}

export function BoardSelector<T extends string>({
  subcategories,
  selectedSubcategory,
  onSubcategorySelect,
}: BoardSelectorProps<T>) {
  return (
    <div className="flex flex-wrap gap-2">
      {subcategories.map((category) => (
        <Category
          key={category}
          isActive={selectedSubcategory === category}
          onClick={() => onSubcategorySelect(category)}
        >
          {category}
        </Category>
      ))}
    </div>
  );
}
