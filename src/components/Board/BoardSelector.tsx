import { Category } from '../Category';

interface BoardSelectorProps {
  subcategories: string[];
  selectedSubcategory: string;
  onSubcategorySelect: (category: string) => void;
}

export function BoardSelector({ subcategories, selectedSubcategory, onSubcategorySelect }: BoardSelectorProps) {
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
