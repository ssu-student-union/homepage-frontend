import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/libs/utils';
import { Link, To } from 'react-router-dom';

export function LinkCategories({
  value,
  categories,
}: {
  value: string;
  categories: { id: string; name: string; to: To }[];
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        {categories.map((categoryDef) => (
          <Link
            key={categoryDef.id}
            className={cn(
              buttonVariants({ variant: categoryDef.id === value ? 'default' : 'outline' }),
              'rounded-full px-3 py-2 text-xs h-7 md:h-9 md:px-4 md:text-base',
              categoryDef.id !== value && 'text-neutral-600'
            )}
            to={categoryDef.to}
          >
            {categoryDef.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
