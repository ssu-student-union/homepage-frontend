import { ArticleHeader } from '@/containers/new/ArticleHeader';
import React from 'react';

interface BoardHeaderProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

export function BoardHeader({ title, subtitle, className, children }: BoardHeaderProps) {
  return (
    <ArticleHeader className={className}>
      <div className="flex justify-between">
        <div className="flex w-max flex-col gap-1 md:gap-3">
          <h1 className="text-2xl font-semibold md:text-3xl md:font-bold">{title}</h1>
          {subtitle && <h2 className="font-semibold md:font-bold">{subtitle}</h2>}
        </div>
        <div>{children}</div>
      </div>
    </ArticleHeader>
  );
}
