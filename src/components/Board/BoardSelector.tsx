import { Category } from '../Category';

interface BoardSelectorProps<T> {
  subcategories: T[];
  selectedSubcategory: T;
  onSubcategorySelect: (category: T) => void;
}

export function BoardSelector<T>({ subcategories, selectedSubcategory, onSubcategorySelect }: BoardSelectorProps<T>) {
  return (
    <div className="flex flex-wrap gap-2">
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
