import Breadcrumb from '@/components/Breadcrumb';
import { formatYYYYMMDDHHMM } from '@/utils/formatYYYYMMDDHHMM';
import { User } from '@phosphor-icons/react';

interface LostDetailTopSectionProps {
  title: string;
  studentId: string;
  isCouncil: boolean;
  date: string;
  items: Map<string, string | null>;
}

export function LostDetailTopSection({ title, date, items, studentId, isCouncil }: LostDetailTopSectionProps) {
  const formattedDate = date ? formatYYYYMMDDHHMM(date) : '';

  const blockName = isCouncil ? studentId : studentId.substring(0, 2) + '****' + studentId.substring(6, 8);
  return (
    <>
      <div className="mt-16 flex flex-col">
        <Breadcrumb items={items} />
        <div className="mb-1 pt-[24px] text-2xl font-bold text-black">{title}</div>
        <div className="flex items-center pb-[24px] pt-[8px] text-sm font-medium text-[#999999]">
          <User className="mr-[3px]" />
          {blockName} · {formattedDate}
        </div>
      </div>
      <div className="h-[2px] w-full bg-[#E7E7E7]" />
    </>
  );
}
