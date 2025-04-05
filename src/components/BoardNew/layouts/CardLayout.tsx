import { PostCard } from '@/components/BoardNew/PostCard';
import { cn } from '@/libs/utils';
import React from 'react';

export function CardLayout({ className, children }: { className?: string; children: React.ReactNode }) {
  const length = React.Children.count(children);
  return (
    <div
      className={cn(
        'grid grid-cols-1 place-items-stretch justify-between gap-7 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
        className
      )}
    >
      {length ? (
        children
      ) : (
        <div className="col-span-full flex grow items-center justify-center py-8">
          <p className="text-neutral-400">게시물이 없습니다.</p>
        </div>
      )}
    </div>
  );
}

CardLayout.Skeleton = ({ className }: { className?: string }) => (
  <div className={cn('grid grid-cols-1 justify-between gap-7 md:grid-cols-3 lg:grid-cols-4', className)}>
    <PostCard.Skeleton />
    <PostCard.Skeleton />
    <PostCard.Skeleton />
    <PostCard.Skeleton />
  </div>
);
