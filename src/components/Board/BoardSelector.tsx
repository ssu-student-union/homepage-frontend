import { Category } from "../Category";

interface BoardSelectorProps {
  subcategories: string[];
  baseUrl: string;
  onSelect(content: string): void;
}

export function BoardSelector({
  subcategories,
  baseUrl,
  onSelect,
}: BoardSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {subcategories &&
        subcategories.map((subcategory) => (
          <Category
            key={subcategory}
            path={`${baseUrl}/${subcategory}`}
            onSelect={onSelect}
          >
            {subcategory}
          </Category>
        ))}
    </div>
  );
}
