import { RefAttributes } from 'react';
import { cn } from '@/libs/utils.ts';
import { Skeleton } from '@/components/ui/skeleton.tsx';
import { Link, LinkProps } from 'react-router';
import dayjs from 'dayjs';
import FileDownButton from '@/components/FileDownButton';
import { FileResponse } from '@/schemas/post';

interface DataContentProp extends LinkProps, RefAttributes<HTMLAnchorElement> {
  title: string;
  content: string;
  date: Date;
  isNotice: boolean;
  className?: string;
  files: FileResponse[];
}

/**
 * # 자료집 게시글 항목
 *
 * 자료집에 쓰이는 자료 목록에서 사용할 수 있는 자료 항목 컴포넌트입니다.
 * 일반적으로 `BodyLayout` 아래에 리스트 형태 아이템으로 표시할 수 있습니다.
 */
export function DataContentItem({ title, content, date, isNotice, files, ...props }: DataContentProp) {
  const formattedDate = dayjs(date).format('(YYYY.MM.DD)');
  return (
    <div
      className={cn(
        'flex flex-col flex-wrap items-start justify-start gap-3 border-b border-b-gray-200 p-5 text-sm font-medium md:text-lg lg:flex-row'
      )}
    >
      <Link {...props} className="block grow">
        <span className={cn('mr-2 text-muted-foreground', isNotice && 'text-primary')}>
          [{isNotice ? '공지' : content}]
        </span>
        <span>
          {title} - {formattedDate}
        </span>
      </Link>
      <div className="flex grow flex-row flex-wrap justify-end gap-2">
        {files.map((file, index) => (
          <FileDownButton key={`${index} + ${file}`} file={file} />
        ))}
      </div>
    </div>
  );
}

DataContentItem.Skeleton = () => {
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
