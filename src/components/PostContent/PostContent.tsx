import { RefAttributes } from 'react';
import { cn } from '@/libs/utils.ts';
import dayjs from 'dayjs';
import { Skeleton } from '@/components/ui/skeleton.tsx';
import { Link, LinkProps } from 'react-router';

interface PostContentProp<C extends string> extends LinkProps, RefAttributes<HTMLAnchorElement> {
  category: {
    name: C;
    className: string;
  };
  date: Date;
  title: string;
  author?: string;
  className?: string;
}

/**
 * # 일반 게시판 목록 게시글 항목
 *
 * 일반 형태의 게시판 목록에서 사용할 수 있는 게시글 항목 컴포넌트입니다.
 * 일반적으로 `BodyLayout` 아래에 리스트 형태 아이템으로 표시할 수 있습니다.
 * C는 literal union이길 권장합니다만, 상황에 따라 다양한 타입을 넣을 수 있습니다.
 */
export function PostContent<C extends string>({ category, title, author, date, ...props }: PostContentProp<C>) {
  const formattedDate = dayjs(date).format('YYYY/MM/DD');

  return (
    <Link {...props} className={cn('flex gap-5 border-b border-b-gray-400 p-5 font-medium')}>
      <div className={cn('text-nowrap', category.className)}>[{category.name}]</div>
      {/* 잘못된 tailwind.config.js: `min-`, `max-` prefix로 range가 지원되는데 왜 이렇게 breakpoint를 짰을까요??
       * Reference: https://tailwindcss.com/docs/responsive-design#targeting-mobile-screens
       */}
      <div className="flex basis-full flex-col justify-between gap-5 md:flex-row">
        <div className="max-md:basis-full">{title}</div>
        <div className="flex justify-between gap-5 max-md:basis-full">
          <span>{author}</span>
          <span className="text-gray-500">{formattedDate}</span>
        </div>
      </div>
    </Link>
  );
}

PostContent.Skeleton = () => {
  return (
    <div className={cn('flex gap-5 border-b border-b-gray-200 p-5 font-medium')}>
      <Skeleton className={cn('h-6 w-[6ch] text-nowrap')} />
      <div className="flex basis-full flex-col justify-between gap-5 md:flex-row">
        <Skeleton className="h-6 w-[20ch] max-md:basis-full" />
        <div className="flex justify-between gap-5 max-md:basis-full">
          <Skeleton className="h-6 w-[4ch]" />
          <Skeleton className="h-6 w-[10ch]" />
        </div>
      </div>
    </div>
  );
};
