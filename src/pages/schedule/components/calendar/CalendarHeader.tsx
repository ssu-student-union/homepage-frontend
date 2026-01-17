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
    <div className="flex items-center justify-center gap-[3.875rem]">
      <button type="button" className="rounded p-1 hover:bg-gray-100" onClick={onPreviousMonth} aria-label="이전 달">
        <CaretLeft weight="bold" className="size-4 text-gray-700" />
      </button>
      <div className="text-lg font-bold leading-normal tracking-[-0.09rem] text-[#374151] md:text-[2.1501875rem] lg:text-[2.6130625rem] xl:text-[2.1rem]">
        {formattedDate}
      </div>
      <button type="button" className="rounded p-1 hover:bg-gray-100" onClick={onNextMonth} aria-label="다음 달">
        <CaretRight weight="bold" className="size-4 text-gray-700" />
      </button>
    </div>
  );
}
