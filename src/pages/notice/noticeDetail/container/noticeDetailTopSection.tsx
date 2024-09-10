import Breadcrumb from '@/components/Breadcrumb';
import { items } from '../../const/data';
import { formatYYYYMMDDHHMM } from '@/utils/formatYYYYMMDDHHMM';
import { User } from '@phosphor-icons/react';

interface NoticeDetailTopSectionProps {
  title: string;
  date: string;
}

export function NoticeDetailTopSection({ title, date }: NoticeDetailTopSectionProps) {
  const formattedDate = date ? formatYYYYMMDDHHMM(date) : '';

  return (
    <>
      <div className="mt-[120px] flex flex-col">
        <Breadcrumb items={items} />
        <div className="mb-1 pt-[24px] text-2xl font-bold text-black">{title}</div>
        <div className="flex items-center pb-[24px] pt-[8px] text-sm font-medium text-[#999999]">
          <User className="mr-[3px]" />
          중앙 | 총학생회 · {formattedDate}
        </div>
      </div>
      <div className="h-[2px] w-full bg-[#E7E7E7]" />
    </>
  );
}
