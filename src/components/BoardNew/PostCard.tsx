import { Badge } from '@/components/ui/badge';
import { cn } from '@/libs/utils';
import { cva } from 'class-variance-authority';
import { useMemo } from 'react';
import { Link, To } from 'react-router';

interface Post {
  postId: string | number;
  title: string;
  content?: string;
  date?: string;
  author?: string;
  thumbNail?: string;
  status?: '긴급공지' | '새로운' | '일반';
}

const cardVariants = cva('flex gap-2 p-2 rounded-md relative', {
  variants: {
    variant: {
      thumbnail: 'flex-col border',
      list: 'flex-row border-b rounded-none items-center',
    },
  },
  defaultVariants: {
    variant: 'list',
  },
});

export function PostCard<T extends Post = Post>({ post, className, to }: { post: T; className?: string; to: To }) {
  post.status = '긴급공지';
  const statusVariant = useMemo(() => {
    switch (post.status) {
      case '긴급공지':
        return 'destructive';
      case '새로운':
        return 'default';
      default:
        return undefined;
    }
  }, [post.status]);

  return (
    <>
      <Link className={cn(cardVariants({ variant: 'list' }), 'md:hidden', className)} to={to}>
        <div className="flex grow flex-col gap-1 self-stretch">
          <h1 className="line-clamp-2 text-ellipsis break-all text-sm font-medium">
            {statusVariant && (
              <Badge variant={statusVariant} size="sm" className="mr-1">
                긴급
              </Badge>
            )}
            {post.title}
          </h1>
          <p className="line-clamp-2 text-ellipsis break-all text-xs">{post.content}</p>
          <div className="flex items-center gap-2 text-xs text-neutral-400">
            <p>{post.author}</p>
            <p>{post.date}</p>
          </div>
        </div>
        <img
          src={post.thumbNail || '/image/default/thumbnail/thumbnail.webp'}
          alt="Thumbnail"
          className="aspect-instagram w-20 shrink-0 rounded-md object-contain"
        />
      </Link>
      <Link className={cn(cardVariants({ variant: 'thumbnail' }), 'hidden md:flex')} to={to}>
        {statusVariant && (
          <Badge variant={statusVariant} className="absolute right-2 top-3 z-10 mr-1">
            긴급
          </Badge>
        )}
        <img
          src={post.thumbNail || '/image/default/thumbnail/thumbnail.webp'}
          alt={post.title}
          className="aspect-instagram w-full rounded-md object-cover hover:object-contain"
        />
        <div className="flex grow flex-col justify-between gap-2">
          <h1 className="line-clamp-2 text-ellipsis break-all text-base font-semibold">{post.title}</h1>
          <div className="flex items-center gap-2 text-sm text-neutral-400">
            <p>{post.author}</p>
            <p>{post.date}</p>
          </div>
        </div>
      </Link>
    </>
  );
}

PostCard.Skeleton = ({ className }: { className?: string }) => (
  <div className={cn(cardVariants({ variant: 'list' }), 'animate-pulse', className)}>
    <div className="h-4 w-1/2 rounded-md bg-gray-200"></div>
    <div className="h-4 w-1/3 rounded-md bg-gray-200"></div>
  </div>
);
