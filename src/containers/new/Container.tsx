import { ReactNode } from 'react';
import { cn } from '@/libs/utils.ts';
import { Skeleton } from '@/components/ui/skeleton.tsx';

interface ContainerProps {
  className?: string;
  children: ReactNode;
}

export function Container({ className, children }: ContainerProps) {
  return (
    <section className={cn('flex justify-center px-10 py-20 md:px-[72px] lg:px-[200px]', className)}>
      <div className="w-full max-w-[1040px]">{children}</div>
    </section>
  );
}

Container.Skeleton = () => {
  return (
    <section className="flex justify-center px-10 py-20 md:px-[72px] lg:px-[200px]">
      <div className="w-full max-w-[1040px]">
        <Skeleton className="h-48 w-full" />
      </div>
    </section>
  );
};
