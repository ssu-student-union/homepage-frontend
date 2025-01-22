import dayjs from 'dayjs';
import Breadcrumb from '@/components/Breadcrumb';
import { User } from '@phosphor-icons/react';
import { Skeleton } from '@/components/ui/skeleton.tsx';
import { ArticleHeader } from '@/containers/new/ArticleHeader.tsx';

interface PostHeaderProps {
  title: string;
  authorName: string;
  createdAt: Date;
  breadcrumbItems: [string, string | null][];
  className?: string;
}

export function PostHeader({ title, authorName: author, createdAt, breadcrumbItems, className }: PostHeaderProps) {
  const breadcrumbMap = new Map<string, string | null>(breadcrumbItems);
  const formattedDate = dayjs(createdAt).format('YYYY/MM/DD HH:mm');

  return (
    <ArticleHeader className={className}>
      <Breadcrumb items={breadcrumbMap} className="mb-6" />
      <h1 className="text-2xl font-bold text-black">{title}</h1>
      {/* TODO: 이후 디자인 변경시 text 색상 tailwind 토큰으로 변경 */}
      <div className="flex items-center text-[#999999]">
        <address className="flex items-center gap-1 not-italic after:ml-0.5 after:mr-1.5 after:content-['·']">
          <User />
          {author}
        </address>
        <time dateTime={createdAt.toString()}>{formattedDate}</time>
      </div>
    </ArticleHeader>
  );
}

PostHeader.Skeleton = () => {
  return (
    <header className="flex justify-center px-10 md:px-[72px] lg:px-[200px] xl:px-[200px] xxl:px-[200px]">
      <div className="mb-6 flex w-full max-w-[1040px] flex-col gap-2">
        <Skeleton className="mb-6 h-[1.5ch] w-[10ch]" />
        <Skeleton className="h-[2ch] w-[25ch] text-2xl" />
        <Skeleton className="h-[1.5ch] w-[25ch]" />
      </div>
    </header>
  );
};
