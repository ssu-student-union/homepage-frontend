import { ArticleHeader } from '@/containers/new/ArticleHeader';
import { cn } from '@/libs/utils';
import React from 'react';

interface BoardHeaderProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  className?: string;
  subtitleStyle?: string;
  children?: React.ReactNode;
}

export function BoardHeader({ title, subtitle, className, subtitleStyle, children }: BoardHeaderProps) {
  return (
    <ArticleHeader className={cn('py-4 md:py-6 xl:pt-16', className)}>
      <div className="flex justify-between">
        <div className="flex w-max flex-col gap-1 md:gap-3">
          <h1 className="text-2xl font-semibold md:text-3xl md:font-bold">{title}</h1>
          {subtitle && <h2 className={cn('font-semibold md:font-bold', subtitleStyle)}>{subtitle}</h2>}
        </div>
        <div>{children}</div>
      </div>
    </ArticleHeader>
  );
}
