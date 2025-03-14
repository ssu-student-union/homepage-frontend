import { cn } from '@/libs/utils';
import { Category } from '../Category';
import { useTranslation } from 'react-i18next';
import { qnaMajorCodesData, qnaMemberCodeData } from '@/pages/qna-notice/collegesData';
import { QnaMajorCode, QnaMemberCode } from '@/pages/qna-notice/types';

interface BoardSelectorProps<T> {
  subcategories: T[];
  selectedSubcategory: T;
  className?: string;
  onSubcategorySelect: (category: T) => void;
}

export function BoardSelector<T extends string>({
  subcategories,
  selectedSubcategory,
  className = '',
  onSubcategorySelect,
}: BoardSelectorProps<T>) {
  const { t } = useTranslation();
  return (
    <div className={cn(`flex flex-wrap gap-2`, className)}>
      {subcategories.map((category) => {
        let translateType = 'board-selector';

        if (qnaMemberCodeData.includes(category as QnaMemberCode)) {
          translateType = 'faculties';
        }
        if (qnaMajorCodesData.includes(category as QnaMajorCode)) {
          translateType = 'departments';
        }

        return (
          <Category
            key={category}
            isActive={selectedSubcategory === category}
            onClick={() => onSubcategorySelect(category)}
          >
            {t(`${translateType}.${category}`)}
          </Category>
        );
      })}
    </div>
  );
}

BoardSelector.Skeleton = () => {
  return (
    <div className={cn(`flex flex-wrap gap-2`)}>
      <Category.Skeleton />
      <Category.Skeleton />
    </div>
  );
};
