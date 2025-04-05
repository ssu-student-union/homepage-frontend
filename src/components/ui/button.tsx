import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/libs/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:bg-gray-400 disabled:opacity-50',

  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-neutral-200 bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        'sheet-item':
          'flex w-full justify-start rounded-none border-b text-base hover:text-accent-foreground hover:underline',
        link: 'text-primary underline-offset-4 hover:underline',
        Register:
          'h-10 w-full rounded-[7px] bg-[#2F4BF7] text-center text-xs font-semibold text-white hover:bg-[#2F4BF7]/90 sm:text-lg lg:w-[105px]',
        List_Edit:
          'flex h-10 w-32 gap-2 border border-gray-400 bg-white text-center text-lg font-semibold text-gray-700 hover:border-primary hover:bg-white hover:text-primary',
        Write:
          'flex h-10 w-32 gap-1 border border-gray-400 bg-white pl-5 pr-6 text-center text-lg font-semibold text-gray-700 hover:border-primary hover:bg-white hover:text-primary',
        translate: 'h-full w-[64px] bg-primary text-primary-foreground hover:bg-primary/90',
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

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isDisabled?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isDisabled = false, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp className={cn(buttonVariants({ className, variant, size }))} ref={ref} disabled={isDisabled} {...props} />
    );
  }
);
Button.displayName = 'Button';

// eslint-disable-next-line react-refresh/only-export-components
export { Button, buttonVariants };
