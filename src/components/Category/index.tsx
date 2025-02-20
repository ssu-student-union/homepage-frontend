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
        `flex h-[31px] min-w-fit items-center justify-center rounded-[32px] border border-gray-800 px-[16px] py-[8px] text-[0.875rem] font-bold transition-colors duration-100 md:h-[38px] md:text-[1.125rem] ${
          isActive
            ? 'bg border-none bg-primary text-white'
            : 'border border-black bg-white text-black hover:bg-gray-100'
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
