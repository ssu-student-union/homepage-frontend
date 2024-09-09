import Breadcrumb from '@/components/Breadcrumb';
import { formatYYYYMMDDHHMM } from '@/utils/formatYYYYMMDDHHMM';
import { User } from '@phosphor-icons/react';

interface LostDetailTopSectionProps {
  title: string;
  authorName: string;
  date: string;
  items: Map<string, string | null>;
}

export function LostDetailTopSection({ title, date, items, authorName }: LostDetailTopSectionProps) {
  const formattedDate = date ? formatYYYYMMDDHHMM(date) : '';

  const maskedAuthorName = authorName.length >= 2 ? authorName[0] + '*' + authorName.slice(2) : authorName;

  return (
    <>
      <div className="mt-[120px] flex flex-col">
        <Breadcrumb items={items} />
        <div className="mb-1 pt-[24px] text-2xl font-bold text-black">{title}</div>
        <div className="flex items-center pb-[24px] pt-[8px] text-sm font-medium text-[#999999]">
          <User className="mr-[3px]" />
          {maskedAuthorName} · {formattedDate}
        </div>
      </div>
      <div className="h-[2px] w-full bg-[#E7E7E7]" />
    </>
  );
}
