import { cn } from '@/libs/utils';
import { Switch } from '../Switch';
import { useTranslation } from 'react-i18next';

interface BoardNavigatorProps {
  categories: string[];
  selectedCategory: string;
  className?: string;
  onCategorySelect: (subcategory: string) => void;
}

export function BoardNavigator({
  categories,
  selectedCategory,
  className = '',
  onCategorySelect,
}: BoardNavigatorProps) {
  const { t } = useTranslation();
  return (
    <div className={cn(`inline-flex overflow-hidden rounded-md border border-gray-300 p-1`, className)}>
      {categories.map((subcategory) => (
        <Switch
          key={subcategory}
          isActive={selectedCategory === subcategory}
          onClick={() => onCategorySelect(subcategory)}
        >
          {t(`board-navigator.${subcategory}`)}
        </Switch>
      ))}
    </div>
  );
}
