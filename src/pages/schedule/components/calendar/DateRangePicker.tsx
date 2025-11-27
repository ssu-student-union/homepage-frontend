import { isToday, subMonths, addMonths } from 'date-fns';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';
import { cn } from '@/libs/utils';
import { CATEGORY_COLORS, DATE_COLORS, DATE_SELECTION_COLORS } from '../../const/const';
import { DateGridBase, type DateGridBaseProps } from './DateGridBase';
import { formatMonthYear } from '../../utils/dateFormat';

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
  const getDateTextColor = (day: number) => {
    if (day === 0) return DATE_COLORS.gray;
    if (day === 6) return DATE_COLORS.gray;
    return DATE_COLORS.default;
  };

  const renderDateCell = (date: Date, index: number) => {
    const day = date.getDay();
    const isTodayDate = isToday(date);
    const selected = isDateSelected(date);
    const isStart = isDateStart(date);
    const isEnd = isDateEnd(date);
    const isInRange = selected && !isStart && !isEnd;

    let textColor: string = getDateTextColor(day);
    let bgColor: string = 'transparent';

    if (selected) {
      if (isStart || isEnd) {
        textColor = DATE_SELECTION_COLORS.text.selected;
        bgColor = DATE_SELECTION_COLORS.selected;
      }
    }

    // 주의 위치 계산
    const dayOfWeek = index % 7;
    const isWeekStart = dayOfWeek === 0;
    const isWeekEnd = dayOfWeek === 6;

    // 월의 첫날/마지막날 체크
    const dateNum = date.getDate();
    const isMonthStart = dateNum === 1;
    const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const isMonthEnd = dateNum === lastDayOfMonth;

    let barClassName = '';
    if (isInRange) {
      let expandLeft = true;
      let expandRight = true;

      if (isMonthStart) {
        expandLeft = false;
      }
      if (isMonthEnd) {
        expandRight = false;
      }
      if (isWeekStart) {
        expandLeft = false;
      }
      if (isWeekEnd) {
        expandRight = false;
      }

      if (!expandLeft && !expandRight) {
        barClassName = 'left-0 w-[100%]';
      } else if (!expandLeft && expandRight) {
        barClassName = 'left-0 w-[200%]';
      } else if (expandLeft && !expandRight) {
        barClassName = '-left-full w-[200%]';
      } else {
        barClassName = '-left-full w-[300%]';
      }
    } else if (isStart && isEnd) {
      barClassName = '';
    } else if (isStart) {
      if (isMonthEnd || isWeekEnd) {
        barClassName = 'left-1/2 w-[50%]';
      } else {
        barClassName = 'left-1/2 w-[150%]';
      }
    } else if (isEnd) {
      if (isMonthStart || isWeekStart) {
        barClassName = 'left-0 w-[50%]';
      } else {
        barClassName = '-left-full w-[150%]';
      }
    }

    return (
      <div className="relative flex items-center justify-center">
        {barClassName && (
          <div
            className={cn('absolute z-0', '2xl:h-12 h-6 md:h-10 lg:h-10 xl:h-10', barClassName)}
            style={{
              backgroundColor: DATE_SELECTION_COLORS.inRange,
            }}
          />
        )}
        <button
          onClick={() => onDateClick(date)}
          className={cn(
            '2xl:w-12 2xl:h-12 2xl:text-[1.075125rem] relative z-10 mx-auto flex h-6 w-6 cursor-pointer items-center justify-center rounded-full text-[0.553375rem] transition-[background-color,color] md:h-10 md:w-10 md:text-[1.075125rem] lg:h-10 lg:w-10 lg:text-[1.075125rem] xl:h-10 xl:w-10 xl:text-[1.075125rem]'
          )}
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

  const formattedDate = formatMonthYear(selectedDate);

  return (
    <div className="flex w-full max-w-full shrink-0 flex-col md:w-[602px] md:min-w-[602px] md:max-w-[602px]">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-center gap-[3.875rem]">
          <button
            className="rounded p-1 hover:bg-gray-100"
            onClick={() => setSelectedDate(subMonths(selectedDate, 1))}
            aria-label="이전 달"
          >
            <CaretLeft weight="bold" className="size-4 text-gray-700" />
          </button>
          <div className="2xl:text-[3rem] text-[1.10675rem] font-bold leading-normal tracking-[-0.09rem] text-[#374151] md:text-[2.1501875rem] lg:text-[2.6130625rem] xl:text-[2.1rem]">
            {formattedDate}
          </div>
          <button
            className="rounded p-1 hover:bg-gray-100"
            onClick={() => setSelectedDate(addMonths(selectedDate, 1))}
            aria-label="다음 달"
          >
            <CaretRight weight="bold" className="size-4 text-gray-700" />
          </button>
        </div>

        <div className="flex flex-row items-center justify-end gap-3.5 self-stretch">
          {Object.entries(CATEGORY_COLORS).map(([label, color]) => (
            <div
              key={label}
              className="2xl:text-sm flex flex-row items-center justify-end gap-1 text-[0.3228125rem] font-normal text-[#6B7280] md:text-[0.627125rem] lg:text-[0.762125rem] xl:text-[0.6125rem]"
            >
              <span>{label}</span>
              <div
                className="2xl:size-[0.9375rem] size-[0.345875rem] rounded-full md:size-[0.6719375rem] lg:size-[0.8165625rem] xl:size-[0.65625rem]"
                style={{ backgroundColor: color }}
              />
            </div>
          ))}
        </div>
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
