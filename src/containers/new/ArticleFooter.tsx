import { cn } from '@/libs/utils.ts';
import { ReactNode } from 'react';

interface ArticleFooterProps {
  children?: ReactNode;
  className?: string;
}

export function ArticleFooter({ children, className }: ArticleFooterProps) {
  return (
    <footer className={cn('flex justify-center px-4 md:px-[72px] lg:px-[200px]', className)}>
      <div className="flex w-full max-w-[1040px] flex-col gap-2">{children}</div>
    </footer>
  );
}
