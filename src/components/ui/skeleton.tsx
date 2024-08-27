import { cn } from '@/libs/utils';

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('bg-muted, animate-pulse rounded-md bg-[#E6E6E6]', className)} {...props} />;
}

export { Skeleton };
