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
  isEditMode?: boolean;
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
  setValue: _setValue,
  startDateError,
  endDateError,
  control,
  isDDayError,
  canSubmit,
  onSubmit,
  isEditMode = false,
}: ScheduleDatePickerProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const { isDateSelected, isDateStart, isDateEnd } = createDateSelectionHelpers(startDate, endDate);

  const handleDateClick = (date: Date) => {
    handleDateSelection(date, startDate, endDate, onStartDateChange, onEndDateChange);
  };

  return (
    <section className="mb-12 flex w-full flex-col items-center justify-center md:pl-6">
      <h2 className="mb-8 w-full text-lg font-semibold md:mb-12 md:text-2xl lg:text-[1.75rem]">
        등록할 일정의 <br className="md:hidden" />
        시작일자와 종료일자를 선택해주세요.
      </h2>
      <div className="flex w-full flex-col items-center gap-8 lg:gap-20 xl:flex-row xl:justify-center">
        <div className="flex w-full items-center justify-center rounded-[30px] border border-gray-200 p-5 md:p-10 lg:flex-initial lg:p-9">
          <DateRangePicker
            selectedDate={currentMonth}
            setSelectedDate={setCurrentMonth}
            onDateClick={handleDateClick}
            isDateSelected={isDateSelected}
            isDateStart={isDateStart}
            isDateEnd={isDateEnd}
          />
        </div>
        <div className="flex w-full max-w-[326px] flex-col items-center justify-center gap-4 md:max-w-[336px] md:gap-14">
          <div className="flex w-full flex-row items-center justify-center gap-9 xl:flex-col">
            <div className="flex flex-col items-center justify-center gap-2">
              <h3 className="text-center text-lg font-semibold">시작일자</h3>
              <p className="text-center text-base text-gray-700">{formatDateToMonthDay(startDate)}</p>
              {startDateError && <p className="text-center text-sm text-red-500">{startDateError.message}</p>}
            </div>
            <div className="flex flex-col items-center justify-center gap-2">
              <h3 className="text-center text-lg font-semibold">종료일자</h3>
              <p className="text-center text-base text-gray-700">{formatDateToMonthDay(endDate)}</p>
              {endDateError && <p className="text-center text-sm text-red-500">{endDateError.message}</p>}
            </div>
          </div>
          <div className="flex w-full items-center justify-center">
            <ScheduleDDayCheckbox control={control} error={isDDayError} />
          </div>
          <div className="flex w-full items-center justify-center">
            <Button type="button" onClick={onSubmit} disabled={!canSubmit} className="mt-4 w-full rounded-xs">
              {isEditMode ? '수정하기' : '등록하기'}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
