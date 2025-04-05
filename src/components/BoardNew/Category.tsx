import { cn } from '@/libs/utils';
import { Skeleton } from '@/components/ui/skeleton.tsx';
import { cva } from 'class-variance-authority';

interface CategoryProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
  size: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
}

// eslint-disable-next-line react-refresh/only-export-components
export const categoryVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:bg-gray-400 disabled:opacity-50',

  {
    variants: {
      variant: {
        default: 'border border-neutral-200 bg-background hover:bg-accent hover:text-accent-foreground',
        active: 'border-0 bg-primary text-primary-foreground hover:bg-primary/90',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export function Category({ isActive = false, size, children, className, ...props }: CategoryProps) {
  return (
    <button className={categoryVariants({ variant: isActive ? 'active' : 'default', size })} {...props}>
      {children}
    </button>
  );
}

Category.Skeleton = () => {
  return (
    <Skeleton
      className={cn(
        `h-[38px] w-[6ch] rounded-[32px] text-[1.125rem] xs:h-[31px] xs:text-[0.875rem] sm:h-[31px] sm:text-[0.875rem]`
      )}
    />
  );
};
