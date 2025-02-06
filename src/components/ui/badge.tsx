import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/libs/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        secondary: 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive: 'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outline: 'text-foreground',
        Emergency:
          'bg-red-500 rounded-[21px] w-[54px] h-[23px] flex justify-center text-white border-none absolute top-[-10px] right-[-10px]',
        New: 'bg-primary rounded-[21px] w-[54px] h-[23px] flex justify-center text-white border-none absolute top-[-10px] right-[-10px]',
        Default: 'hidden',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge };
