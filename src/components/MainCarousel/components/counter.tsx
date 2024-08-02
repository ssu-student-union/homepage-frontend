import { cn } from '@/libs/utils';
import { cva } from 'class-variance-authority';

export const CounterItem = ({ isActive = false }: { isActive?: boolean }) => {
  const counterVariants = cva('w-[45px] h-[7px] rounded-[15px] block', {
    variants: {
      variant: {
        default: 'bg-[#E4E4E4]',
        isActive: 'bg-[#B8B8B8]',
      },
    },
  });

  return <span className={cn(counterVariants({ variant: isActive ? 'isActive' : 'default' }))}></span>;
};

export const Counter = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn('absolute flex size-full items-end justify-center gap-[6px] pb-[57px]', className)} {...props}>
      {children}
    </div>
  );
};
