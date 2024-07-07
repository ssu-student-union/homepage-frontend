import { Switch } from "../Switch";

interface BoardNavigatorProps {
  categories: string[];
  baseUrl: string;
}

export function BoardNavigator({ categories, baseUrl }: BoardNavigatorProps) {
  return (
    <div className="inline-flex gap-2 mb-4 p-1 bg-white border rounded-sm">
      {categories &&
        categories.map((category) => (
          <Switch key={category} path={`${baseUrl}/${category}`}>
            {category}
          </Switch>
        ))}
    </div>
  );
}
