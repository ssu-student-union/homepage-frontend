import { RefAttributes } from 'react';
import { cn } from '@/libs/utils.ts';
import { Skeleton } from '@/components/ui/skeleton.tsx';
import { Link, LinkProps } from 'react-router-dom';
import dayjs from 'dayjs';
import { DataFileType } from '@/pages/data/schema';
import FileDownButton from '@/components/File/FileDownButton';

interface DataContentProp extends LinkProps, RefAttributes<HTMLAnchorElement> {
  title: string;
  content: string;
  date: Date;
  category: string;
  isNotice: boolean;
  className?: string;
  files: DataFileType[];
}

/**
 * # 자료집 게시글 항목
 *
 * 자료집에 쓰이는 자료 목록에서 사용할 수 있는 자료 항목 컴포넌트입니다.
 * 일반적으로 `BodyLayout` 아래에 리스트 형태 아이템으로 표시할 수 있습니다.
 */
export function DataContent({ title, content, date, category, isNotice, files, ...props }: DataContentProp) {
  const formattedDate = dayjs(date).format('(YYYY.MM.DD)');
  return (
    <Link
      {...props}
      className={cn(
        'flex flex-row items-center justify-between border-b border-b-gray-200 p-5 text-[1.125rem] font-medium xs:flex-col xs:items-start xs:gap-[12px] sm:flex-col sm:items-start sm:gap-[12px] md:flex-col md:items-start md:gap-[12px]'
      )}
    >
      <div className="flex flex-row items-start justify-start">
        <div className={cn('mr-[1.125rem] ', isNotice ? 'text-primary' : 'text-muted-foreground')}>
          [{isNotice ? '공지' : category}]
        </div>
        <div className="">
          {title} - {formattedDate}
        </div>
      </div>
      <div
        className="flex flex-row gap-[8px] xs:self-end sm:self-end md:self-end
"
      >
        {files.map((file, index) => (
          <FileDownButton key={`${index} + ${file}`} file={file} />
        ))}
      </div>
    </Link>
  );
}

DataContent.Skeleton = () => {
  return (
    <div className={cn('flex gap-5 border-b border-b-gray-200 p-5 font-medium')}>
      <Skeleton className={cn('h-6 w-[6ch] text-nowrap')} />
      <div className="flex basis-full justify-between gap-5 xs:flex-col sm:flex-col">
        <Skeleton className="max-md:basis-full h-6 w-[20ch]" />
        <div className="max-md:basis-full flex justify-between gap-5">
          <Skeleton className="h-6 w-[4ch]" />
          <Skeleton className="h-6 w-[10ch]" />
        </div>
      </div>
    </div>
  );
};
