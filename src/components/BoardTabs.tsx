import React, { forwardRef, useMemo } from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cn } from '@/libs/utils';
import { Container } from '@/containers/new/Container';
import { QueryLink, QueryLinkProps } from '@/components/QueryLink';
import { LinkProps, useSearchParams } from 'react-router';

const BoardTabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <div className="relative w-full">
    <Container className="py-0">
      <TabsPrimitive.List
        ref={ref}
        className={cn(
          'inline-flex h-10 items-center justify-center gap-0.5 rounded-md border border-gray-200 bg-white p-1 text-neutral-600',
          className
        )}
        {...props}
      />
    </Container>
    <hr className="absolute top-1/2 -z-10 h-px w-full bg-gray-200" />
  </div>
));
BoardTabsList.displayName = 'BoardTabsList';

const BoardTabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      'inline-flex h-8 items-center justify-center whitespace-nowrap rounded-sm px-4 py-1 text-lg font-bold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-sm',
      className
    )}
    {...props}
  />
));
BoardTabsTrigger.displayName = 'BoardTabsTrigger';

const BoardTabsQueryLink = forwardRef<HTMLAnchorElement, Omit<LinkProps, 'to'> & QueryLinkProps>(
  ({ className, query, value, ...props }, ref) => {
    const [search] = useSearchParams();
    const state = useMemo(() => search.get(query) === value ? 'active' : 'inactive', [search, query, value]);
    return (
      <QueryLink
        className={cn(
          'inline-flex h-8 items-center justify-center whitespace-nowrap rounded-sm px-4 py-1 text-lg font-bold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-sm',
          className
        )}
        data-state={state}
        ref={ref}
        query={query}
        value={value}
        {...props}
      />
    );
  }
);
BoardTabsQueryLink.displayName = 'BoardTabsQueryLink';

export { BoardTabsList, BoardTabsTrigger, BoardTabsQueryLink };
