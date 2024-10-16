import { ReactNode } from 'react';
import { cn } from '@/libs/utils.ts';
import { Skeleton } from '@/components/ui/skeleton.tsx';

interface PostContentProps {
  className?: string;
  children: ReactNode;
}

export function Container({ className, children }: PostContentProps) {
  return (
    <section
      className={cn('flex justify-center px-10 md:px-[72px] lg:px-[200px] xl:px-[200px] xxl:px-[200px]', className)}
    >
      <div className="w-full max-w-[1040px] py-20">{children}</div>
    </section>
  );
}

Container.Skeleton = () => {
  return (
    <section className="flex justify-center px-10 md:px-[72px] lg:px-[200px] xl:px-[200px] xxl:px-[200px]">
      <div className="w-full max-w-[1040px] py-20">
        <Skeleton className="h-48 w-full" />
      </div>
    </section>
  );
};
