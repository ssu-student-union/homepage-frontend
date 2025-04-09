import Breadcrumb from '@/components/Breadcrumb';
import { items } from '../../const';
import { formatYYYYMMDDHHMM } from '@/utils/formatYYYYMMDDHHMM';
import { User } from '@phosphor-icons/react';

interface NoticeDetailTopSectionProps {
  title: string;
  author: string;
  date: string;
}

export function NoticeDetailTopSection({ title, date, author = '총학생회' }: NoticeDetailTopSectionProps) {
  const formattedDate = date ? formatYYYYMMDDHHMM(date) : '';

  const isCentral = ['총학생회', '중앙운영위원회', '중앙선거관리위원회', '동아리연합회', 'IT지원위원회'].includes(
    author
  );
  const authorType = isCentral ? '중앙' : '단과대';

  return (
    <>
      <div className="mt-16 flex flex-col">
        <Breadcrumb items={items} />
        <div className="mb-1 pt-[24px] text-2xl font-bold text-black">{title}</div>
        <div className="flex items-center pb-[24px] pt-[8px] text-sm font-medium text-[#999999]">
          <User className="mr-[3px]" />
          {authorType} | {author} · {formattedDate}
        </div>
      </div>
      <div className="h-[2px] w-full bg-[#E7E7E7]" />
    </>
  );
}
