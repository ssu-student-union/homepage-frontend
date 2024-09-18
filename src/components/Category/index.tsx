import { cn } from '@/libs/utils';

interface CategoryProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
  className?: string;
}

export function Category({ isActive = false, children, className = '', ...props }: CategoryProps) {
  return (
    <button
      className={cn(
        `flex h-[38px] min-w-fit items-center justify-center rounded-[32px] border border-gray-800 px-[16px] py-[8px] text-[1.125rem] font-bold transition-colors duration-100 xs:h-[31px] xs:text-[0.875rem] sm:h-[31px] sm:text-[0.875rem] ${
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
