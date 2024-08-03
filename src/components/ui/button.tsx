import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/libs/utils';

const buttonVariants = cva(

  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:bg-gray-400",

  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        Register:
          "bg-[#2F4BF7] hover:bg-[#2F4BF7]/90 w-[105px] md:w-full sm:w-full xs:w-full h-10 text-white text-lg text-center font-semibold rounded-[7px]",
        List_Edit:
          'pl-2 flex gap-2 pr-6 w-32 h-10 bg-white border border-gray-400 text-lg text-center font-semibold text-gray-700 hover:border-primary hover:bg-white hover:text-primary',
        Write:
          'pl-5 flex gap-1 pr-6 w-32 h-10 bg-white border border-gray-400 text-lg text-center font-semibold text-gray-700 hover:border-primary hover:bg-white hover:text-primary',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
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
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} disabled={isDisabled} {...props} />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
