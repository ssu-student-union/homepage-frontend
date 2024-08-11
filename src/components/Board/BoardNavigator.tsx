import { Switch } from '../Switch';

interface BoardNavigatorProps {
  categories: string[];
  selectedCategory: string;
  onCategorySelect: (subcategory: string) => void;
}

export function BoardNavigator({ categories, selectedCategory, onCategorySelect }: BoardNavigatorProps) {
  return (
    <div className="inline-flex overflow-hidden rounded-md border border-gray-300 p-1">
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
