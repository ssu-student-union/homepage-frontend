import * as React from 'react';

import { cn } from '@/libs/utils';
import { cva } from 'class-variance-authority';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isInvalid?: boolean;
  isDisabled?: boolean;
}

const InputVariants = cva(
  'flex min-h-[46px] w-full rounded-md color-gray-800 font-semibold border bg-background px-[20px] py-[16px] text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus:outline-none focus:border focus:border-primary disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border-gray-500 ',
        error: 'border-red-400',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, isInvalid = false, isDisabled = false, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(InputVariants({ variant: isInvalid ? 'error' : 'default' }), className)}
        ref={ref}
        disabled={isDisabled}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
