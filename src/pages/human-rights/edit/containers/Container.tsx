import { ReactNode } from 'react';
import { cn } from '@/libs/utils.ts';

interface ContainerProps {
  className?: string;
  children: ReactNode;
}

// TODO: `human-rights/[id]/components/Container.tsx`와 병합
export function Container({ className, children }: ContainerProps) {
  return (
    <section
      className={cn('flex justify-center px-10 md:px-[72px] lg:px-[200px] xl:px-[200px] xxl:px-[200px]', className)}
    >
      <div className="w-full max-w-[1040px] py-20">{children}</div>
    </section>
  );
}
