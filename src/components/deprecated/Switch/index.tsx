import { cn } from '@/libs/utils';

interface SwitchProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
}

/**
 * @deprecated `Button` 컴포넌트 혹은 `Toggle` 컴포넌트를 커스텀하여 사용하세요.
 */
export function Switch({ isActive = false, children, className, ...props }: SwitchProps) {
  return (
    <button
      className={cn(
        `rounded-sm px-[1rem] py-[0.25rem] text-center text-lg font-bold transition-colors duration-100 ${
          isActive ? 'bg-primary text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
        }`,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
