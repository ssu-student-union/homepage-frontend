import { Switch } from "../Switch";

interface BoardNavigatorProps {
  categories: string[];
  selectedCategory: string;
  onCategorySelect: (subcategory: string) => void;
}

export function BoardNavigator({
  categories,
  selectedCategory,
  onCategorySelect,
}: BoardNavigatorProps) {
  return (
    <div className="p-1 inline-flex rounded-md border border-gray-300 overflow-hidden">
      {categories.map((subcategory) => (
        <Switch
          key={subcategory}
          isActive={selectedCategory === subcategory}
          onClick={() => onCategorySelect(subcategory)}
        >
          {subcategory}
        </Switch>
      ))}
    </div>
  );
}
