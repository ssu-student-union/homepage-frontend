import dayjs from 'dayjs';
import Breadcrumb from '@/components/Breadcrumb';
import { User } from '@phosphor-icons/react';

interface PostHeaderProps {
  title: string;
  authorName: string;
  createdAt: Date;
  breadcrumbItems: [string, string | null][];
}

export function PostHeader({ title, authorName: author, createdAt, breadcrumbItems }: PostHeaderProps) {
  const breadcrumbMap = new Map<string, string | null>(breadcrumbItems);
  const formattedDate = dayjs(createdAt).format('YYYY/MM/DD HH:mm');

  return (
    <header className="flex justify-center px-10 md:px-[72px] lg:px-[200px] xl:px-[200px] xxl:px-[200px]">
      <div className="mb-6 flex w-full max-w-[1040px] flex-col gap-2">
        <Breadcrumb items={breadcrumbMap} className="mb-6" />
        <h1 className="text-2xl font-bold text-black">{title}</h1>
        <div className="flex items-center">
          <address className="flex items-center not-italic after:mx-1 after:content-['·']">
            <User />
            {author}
          </address>
          <time dateTime={createdAt.toString()}>{formattedDate}</time>
        </div>
      </div>
    </header>
  );
}
