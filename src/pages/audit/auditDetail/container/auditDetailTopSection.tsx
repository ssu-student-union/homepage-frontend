import Breadcrumb from '@/components/Breadcrumb';
import { formatYYYYMMDDHHMM } from '@/utils/formatYYYYMMDDHHMM';
import { User } from '@phosphor-icons/react';

interface AuditDetailTopSectionProps {
  title: string;
  authorName: string;
  date: string;
  items: Map<string, string | null>;
}

export function AuditDetailTopSection({ title, date, items, authorName }: AuditDetailTopSectionProps) {
  const formattedDate = date ? formatYYYYMMDDHHMM(date) : '';

  return (
    <>
      <div className="mt-[120px] flex flex-col">
        <Breadcrumb items={items} />
        <div className="mb-1 pt-[24px] text-2xl font-bold text-black">{title}</div>
        <div className="flex items-center pb-[24px] pt-[8px] text-sm font-medium text-[#999999]">
          <User className="mr-[3px]" />
          {authorName} · {formattedDate}
        </div>
      </div>
      <div className="h-[2px] w-full bg-[#E7E7E7]" />
    </>
  );
}
