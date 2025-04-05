import * as React from 'react';
import { cn } from '@/libs/utils';
import { cva } from 'class-variance-authority';
import { CaretDoubleLeft, CaretDoubleRight, CaretLeft, CaretRight } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

const PaginationContainer = ({ className, ...props }: React.ComponentProps<'nav'>) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn('mx-auto flex w-full justify-center', className)}
    {...props}
  />
);
PaginationContainer.displayName = 'Pagination';

const PaginationContent = React.forwardRef<HTMLUListElement, React.ComponentProps<'ul'>>(
  ({ className, ...props }, ref) => (
    <ul ref={ref} className={cn('flex flex-row items-center gap-1', className)} {...props} />
  )
);
PaginationContent.displayName = 'PaginationContent';

const PaginationLinkVariants = cva(
  'cursor-pointer select-none h-[27px] w-[27px] text-[18px] flex text-gray-700 font-medium justify-center items-center',
  {
    variants: {
      variant: {
        active: 'bg-gray-100 rounded-[4px]',
        default: ' font-medium ',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

interface PaginationItemProps extends React.ComponentProps<'li'> {
  isActive?: boolean;
}

const PaginationItem = React.forwardRef<HTMLLIElement, PaginationItemProps>(
  ({ className, isActive, ...props }, ref) => (
    <li
      ref={ref}
      className={cn(
        PaginationLinkVariants({
          variant: isActive ? 'active' : 'default',
        }),
        className
      )}
      {...props}
    />
  )
);
PaginationItem.displayName = 'PaginationItem';

const PaginationLink = ({ className, ...props }: React.ComponentProps<typeof Link>) => (
  <Link aria-current={'page'} className={cn('', className)} {...props} />
);
PaginationLink.displayName = 'PaginationLink';

const PaginationPrevious = ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink aria-label="Go to previous page" className={cn('mr-[9.5px] size-[15px]', className)} {...props}>
    <CaretLeft weight="bold" className="size-full" color="#374151" />
  </PaginationLink>
);
PaginationPrevious.displayName = 'PaginationPrevious';

const PaginationNext = ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink aria-label="Go to next page" className={cn('ml-[9.5px]', className)} {...props}>
    <CaretRight weight="bold" className="size-full" color="#374151" />
  </PaginationLink>
);
PaginationNext.displayName = 'PaginationNext';

const PaginationTenPrevious = ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink aria-label="Go to previous 10 pages" className={cn('mr-[9.5px]', className)} {...props}>
    <CaretDoubleLeft weight="bold" className="size-full" color="#374151" />
  </PaginationLink>
);

PaginationTenPrevious.displayName = 'PaginationPrevious';

const PaginationTenNext = ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink aria-label="Go to next 10 pages" className={cn('ml-[9.5px]', className)} {...props}>
    <CaretDoubleRight weight="bold" className="size-full" color="#374151" />
  </PaginationLink>
);
PaginationTenNext.displayName = 'PaginationPrevious';

export {
  PaginationContainer,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationTenNext,
  PaginationTenPrevious,
};
