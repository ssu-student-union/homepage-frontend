import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/libs/utils';
import { Link, To } from 'react-router';

export function LinkCategories({
  className,
  value,
  categories,
}: {
  className?: string;
  value: string;
  categories: { id: string; name: string; to: To }[];
}) {
  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <div className="flex flex-wrap gap-2">
        {categories.map((categoryDef) => (
          <Link
            key={categoryDef.id}
            className={cn(
              buttonVariants({ variant: categoryDef.id === value ? 'default' : 'outline' }),
              'h-7 rounded-full px-3 py-2 text-xs md:h-9 md:px-4 md:text-base',
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
