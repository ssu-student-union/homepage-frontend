import { useState } from 'react';
import { DateGrid } from '@/pages/schedule/components/DateGrid';
import { getMonth, getDate } from 'date-fns';
import { Button } from '@/components/ui/button';
import { handleDateSelection, createDateSelectionHelpers } from '../../utils/dateSelectionHandler';
import { MONTH_NAMES } from '@/pages/schedule/const/const';

interface ScheduleDatePickerProps {
  startDate: Date | null;
  endDate: Date | null;
  onStartDateChange: (date: Date | null) => void;
  onEndDateChange: (date: Date | null) => void;
  onSubmit: () => void;
}

function formatDateToMonthDay(date: Date | null): string {
  if (!date) return '월 일';
  const month = MONTH_NAMES[getMonth(date)];
  const day = getDate(date);
  return `${month} ${day}일`;
}

export function ScheduleDatePicker({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  onSubmit,
}: ScheduleDatePickerProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // 헬퍼 함수 한 번에 생성
  const { isDateSelected, isDateStart, isDateEnd } = createDateSelectionHelpers(startDate, endDate);

  const handleDateClick = (date: Date) => {
    handleDateSelection(date, startDate, endDate, onStartDateChange, onEndDateChange);
  };

  // 등록 버튼 활성화 조건
  const canSubmit = startDate !== null && endDate !== null;

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
      <div className="flex-1">
        <DateGrid
          selectedDate={currentMonth}
          setSelectedDate={setCurrentMonth}
          calendarItems={[]}
          onDateClick={handleDateClick}
          isDateSelected={isDateSelected}
          isDateStart={isDateStart}
          isDateEnd={isDateEnd}
        />
      </div>
      <div className="flex flex-col gap-4 lg:w-[250px]">
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold">시작일자</h3>
          <p className="text-base text-gray-700">{formatDateToMonthDay(startDate)}</p>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold">종료일자</h3>
          <p className="text-base text-gray-700">{formatDateToMonthDay(endDate)}</p>
        </div>
        <Button onClick={onSubmit} disabled={!canSubmit} className="mt-4">
          등록하기
        </Button>
      </div>
    </div>
  );
}
