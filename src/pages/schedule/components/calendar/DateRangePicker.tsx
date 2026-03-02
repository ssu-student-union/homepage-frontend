import { isToday } from 'date-fns';
import { cn } from '@/libs/utils';
import { DATE_COLORS, DATE_SELECTION_COLORS, CALENDAR_DATE_BUTTON_STYLES } from '../../const/const';
import { DateGridBase, type DateGridBaseProps } from './DateGridBase';
import { CalendarHeader } from './CalendarHeader';
import { useCalendarHeader } from './useCalendarHeader';
import { CategoryLegend } from './CategoryLegend';

export interface DateRangePickerProps extends Omit<DateGridBaseProps, 'renderDateCell' | 'showCategoryLegend'> {
  onDateClick: (date: Date) => void;
  isDateSelected: (date: Date) => boolean;
  isDateStart: (date: Date) => boolean;
  isDateEnd: (date: Date) => boolean;
}

/**
 * 날짜 범위 선택용 달력 컴포넌트
 *
 * @description
 * DateGridBase를 사용하여 날짜 범위를 선택할 수 있는 달력을 렌더링합니다.
 * 시작일자와 종료일자를 선택하고, 범위 내 날짜를 시각적으로 표시합니다.
 */
export function DateRangePicker({
  selectedDate,
  setSelectedDate,
  weekStartsOn,
  onDateClick,
  isDateSelected,
  isDateStart,
  isDateEnd,
}: DateRangePickerProps) {
  const renderDateCell = (date: Date, index: number) => {
    const day = date.getDay();
    const isTodayDate = isToday(date);
    const selected = isDateSelected(date);
    const isStart = isDateStart(date);
    const isEnd = isDateEnd(date);
    const isInRange = selected && !isStart && !isEnd;

    // 색상 계산
    const textColor =
      selected && (isStart || isEnd)
        ? DATE_SELECTION_COLORS.text.selected
        : day === 0 || day === 6
          ? DATE_COLORS.gray
          : DATE_COLORS.default;

    const bgColor = selected && (isStart || isEnd) ? DATE_SELECTION_COLORS.selected : 'transparent';

    // 위치 정보
    const dayOfWeek = index % 7;
    const isWeekStart = dayOfWeek === 0;
    const isWeekEnd = dayOfWeek === 6;
    const dateNum = date.getDate();
    const isMonthStart = dateNum === 1;
    const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const isMonthEnd = dateNum === lastDayOfMonth;

    // 막대 스타일 계산
    let barClassName = '';
    if (isInRange) {
      const expandLeft = !isMonthStart && !isWeekStart;
      const expandRight = !isMonthEnd && !isWeekEnd;
      if (!expandLeft && !expandRight) barClassName = 'left-0 w-[100%]';
      else if (!expandLeft) barClassName = 'left-0 w-[200%]';
      else if (!expandRight) barClassName = '-left-full w-[200%]';
      else barClassName = '-left-full w-[300%]';
    } else if (isStart && !isEnd) {
      barClassName = isMonthEnd || isWeekEnd ? 'left-1/2 w-[50%]' : 'left-1/2 w-[150%]';
    } else if (isEnd && !isStart) {
      barClassName = isMonthStart || isWeekStart ? 'left-0 w-[50%]' : '-left-full w-[150%]';
    }

    return (
      <div className="relative flex items-center justify-center">
        {barClassName && (
          <div
            className={cn('2xl:h-12 absolute z-0 h-6 md:h-10 lg:h-10 xl:h-10', barClassName)}
            style={{ backgroundColor: DATE_SELECTION_COLORS.inRange }}
          />
        )}
        <button
          type="button"
          onClick={() => onDateClick(date)}
          className={cn('relative z-10 mx-auto', CALENDAR_DATE_BUTTON_STYLES.rangePicker)}
          style={{ backgroundColor: bgColor, color: textColor }}
          aria-label={`${date.getDate()}일 선택`}
          aria-pressed={selected}
          aria-current={isTodayDate ? 'date' : undefined}
        >
          {date.getDate()}
        </button>
      </div>
    );
  };

  const { handlePreviousMonth, handleNextMonth } = useCalendarHeader(selectedDate, setSelectedDate);

  return (
    <div className="flex w-full max-w-full shrink-0 flex-col md:w-[602px] md:min-w-[602px] md:max-w-[602px]">
      <div className="flex flex-col gap-4">
        <CalendarHeader
          selectedDate={selectedDate}
          onPreviousMonth={handlePreviousMonth}
          onNextMonth={handleNextMonth}
        />
        <CategoryLegend />
      </div>

      <div className="h-5 border-b border-gray-200" />

      <DateGridBase
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        weekStartsOn={weekStartsOn}
        renderDateCell={renderDateCell}
        showCategoryLegend={false}
      />
    </div>
  );
}
