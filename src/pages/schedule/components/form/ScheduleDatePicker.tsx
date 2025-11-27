import { useState } from 'react';
import { DateRangePicker } from '../calendar/DateRangePicker';
import { getMonth, getDate } from 'date-fns';
import { Button } from '@/components/ui/button';
import { handleDateSelection, createDateSelectionHelpers } from '@/pages/schedule/utils/dateSelectionHandler';
import { MONTH_NAMES } from '@/pages/schedule/const/const';
import { UseFormSetValue, FieldError, Control } from 'react-hook-form';
import { ScheduleEditForm } from '../../schema';
import { ScheduleDDayCheckbox } from './ScheduleDDayCheckbox';

interface ScheduleDatePickerProps {
  startDate: Date | null;
  endDate: Date | null;
  onStartDateChange: (date: Date | null) => void;
  onEndDateChange: (date: Date | null) => void;
  setValue: UseFormSetValue<ScheduleEditForm>;
  startDateError?: FieldError;
  endDateError?: FieldError;
  control: Control<ScheduleEditForm>;
  isDDayError?: FieldError;
  canSubmit: boolean;
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
  setValue,
  startDateError,
  endDateError,
  control,
  isDDayError,
  canSubmit,
  onSubmit,
}: ScheduleDatePickerProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const { isDateSelected, isDateStart, isDateEnd } = createDateSelectionHelpers(startDate, endDate);

  const handleDateClick = (date: Date) => {
    handleDateSelection(date, startDate, endDate, onStartDateChange, onEndDateChange);
    if (!startDate || date < startDate) {
      setValue('startDate', date);
    }
    if (!endDate || date > endDate) {
      setValue('endDate', date);
    }
  };

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
      <div className="flex-1">
        <DateRangePicker
          selectedDate={currentMonth}
          setSelectedDate={setCurrentMonth}
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
          {startDateError && <p className="text-sm text-red-500">{startDateError.message}</p>}
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold">종료일자</h3>
          <p className="text-base text-gray-700">{formatDateToMonthDay(endDate)}</p>
          {endDateError && <p className="text-sm text-red-500">{endDateError.message}</p>}
        </div>
        <ScheduleDDayCheckbox control={control} error={isDDayError} />
        <Button onClick={onSubmit} disabled={!canSubmit} className="mt-4">
          등록하기
        </Button>
      </div>
    </div>
  );
}
