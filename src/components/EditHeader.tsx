import { ArticleHeader } from '@/containers/new/ArticleHeader';
import { cn } from '@/libs/utils';
import { User } from 'lucide-react';
import React from 'react';

interface EditHeaderProps {
  title: React.ReactNode;
  memberName?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

export function EditHeader({ title, memberName, className }: EditHeaderProps) {
  return (
    <ArticleHeader className={cn(className)}>
      <h1 className="text-[34px] font-bold">{title}</h1>
      <div className="flex flex-row items-center gap-[5px] text-[16px] font-medium text-[#999999]">
        {memberName && <User className="size-[16px]" />}
        <p>{memberName}</p>
      </div>
    </ArticleHeader>
  );
}
