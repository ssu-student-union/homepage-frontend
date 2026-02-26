import { CaretLeft, CaretRight } from '@phosphor-icons/react';
import { formatMonthYear } from '../../utils/dateFormat';

interface CalendarHeaderProps {
  selectedDate: Date;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
}

/**
 * 달력 헤더 컴포넌트 (월/년 표시 및 이전/다음 달 버튼)
 */
export function CalendarHeader({ selectedDate, onPreviousMonth, onNextMonth }: CalendarHeaderProps) {
  const formattedDate = formatMonthYear(selectedDate);

  return (
    <div className="flex items-center justify-center gap-16">
      <button type="button" className="rounded p-1 hover:bg-gray-100" onClick={onPreviousMonth} aria-label="이전 달">
        <CaretLeft weight="bold" className="size-[9px] text-gray-700 md:size-4" />
      </button>
      <div className="text-2xl font-bold leading-normal tracking-[-3%] text-[#374151] md:text-4xl lg:text-[48px]">
        {formattedDate}
      </div>
      <button type="button" className="rounded p-1 hover:bg-gray-100" onClick={onNextMonth} aria-label="다음 달">
        <CaretRight weight="bold" className="size-[9px] text-gray-700 md:size-4" />
      </button>
    </div>
  );
}
