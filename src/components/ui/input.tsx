import * as React from 'react';

import { cn } from '@/libs/utils';
import { cva } from 'class-variance-authority';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isInvalid?: boolean;
  isDisabled?: boolean;
}

const InputVariants = cva(
  'flex w-full rounded-md border border-input bg-background text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
  {
    variants: {
      variant: {
        default: 'border-border font-semibold',
        error: 'border-red-400',
      },
      size: {
        default: 'h-11 px-5 py-4',
        sm: 'h-10 px-3 py-2',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
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
