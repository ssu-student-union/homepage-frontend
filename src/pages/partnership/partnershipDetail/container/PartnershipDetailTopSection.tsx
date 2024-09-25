import Breadcrumb from '@/components/Breadcrumb';
import { items } from '../../const/data';
import { formatYYYYMMDDHHMM } from '@/utils/formatYYYYMMDDHHMM';
import { User } from '@phosphor-icons/react';

interface PartnershipDetailTopSectionProps {
  title: string;
  date: string;
  writer: string;
}

export function PartnershipDetailTopSection({ title, date, writer }: PartnershipDetailTopSectionProps) {
  const formattedDate = date ? formatYYYYMMDDHHMM(date) : '';

  return (
    <>
      <div className="mt-[120px] flex flex-col">
        <Breadcrumb items={items} />
        <div className="mb-1 pt-[24px] text-2xl font-bold text-black">{title}</div>
        <div className="flex items-center pb-[24px] pt-[8px] text-sm font-medium text-[#999999]">
          <User className="mr-[3px]" />
          {writer} · {formattedDate}
        </div>
      </div>
      <div className="h-[2px] w-full bg-[#E7E7E7]" />
    </>
  );
}
