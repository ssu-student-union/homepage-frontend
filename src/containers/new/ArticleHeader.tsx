import { cn } from '@/libs/utils.ts';
import { ReactNode } from 'react';

interface ArticleHeaderProps {
  children?: ReactNode;
  className?: string;
}

export function ArticleHeader({ children, className }: ArticleHeaderProps) {
  return (
    <header
      className={cn('flex justify-center px-10 md:px-[72px] lg:px-[200px]', className)}
    >
      <div className="mb-6 flex w-full max-w-[1040px] flex-col gap-2">{children}</div>
    </header>
  );
}
