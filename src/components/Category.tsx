import { cn } from '@/libs/utils';
import { Skeleton } from '@/components/ui/skeleton.tsx';

interface CategoryProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
  className?: string;
}

export function Category({ isActive = false, children, className = '', ...props }: CategoryProps) {
  return (
    <button
      className={cn(
        `flex h-[38px] min-w-fit items-center justify-center rounded-[32px] border px-[16px] py-[8px] text-[1.125rem] transition-colors duration-100 xs:h-[31px] xs:text-[0.875rem] sm:h-[31px] sm:text-[0.875rem] ${
          isActive
            ? 'bg border-none bg-primary font-bold text-white'
            : 'border border-neutral-200 bg-white font-medium text-neutral-600 hover:bg-neutral-100'
        } `,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

Category.Skeleton = () => {
  return <Skeleton className={cn(`h-[31px] w-[6ch] rounded-[32px] text-[0.875rem] md:h-[38px] md:text-[1.125rem]`)} />;
};
