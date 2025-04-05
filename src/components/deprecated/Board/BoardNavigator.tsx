import { cn } from '@/libs/utils';
import { Switch } from '../Switch';
import { useTranslation } from 'react-i18next';

interface BoardNavigatorProps {
  categories: string[];
  selectedCategory: string;
  className?: string;
  onCategorySelect: (subcategory: string) => void;
}

/**
 * @deprecated shadcn/ui의 `Tabs`를 `BoardTabs` 내 컴포넌트와 함께 사용하세요 (`pages/notice/page.tsx` 참고).
 */
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
