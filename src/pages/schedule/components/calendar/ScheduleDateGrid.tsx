import { isToday, isSameDay, subMonths, addMonths } from 'date-fns';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';
import { cn } from '@/libs/utils';
import { CATEGORY_COLORS, DATE_COLORS } from '../../const/const';
import { CalendarItem } from '../../types';
import { getSchedulesForDate } from '../../utils/getSchedulesForDate';
import { formatMonthYear } from '../../utils/dateFormat';
import { DateGridBase, type DateGridBaseProps } from './DateGridBase';

export interface ScheduleDateGridProps extends Omit<DateGridBaseProps, 'renderDateCell' | 'showCategoryLegend'> {
  calendarItems: CalendarItem[];
}

/**
 * 일정 표시용 달력 그리드 컴포넌트
 *
 * @description
 * DateGridBase를 사용하여 일정을 표시하는 달력을 렌더링합니다.
 * 각 날짜 아래에 해당 날짜의 일정을 색상 바로 표시합니다.
 */
export function ScheduleDateGrid({
  selectedDate,
  setSelectedDate,
  weekStartsOn,
  calendarItems,
}: ScheduleDateGridProps) {
  const getDateTextColor = (day: number) => {
    if (day === 0) return DATE_COLORS.gray;
    if (day === 6) return DATE_COLORS.gray;
    return DATE_COLORS.default;
  };

  const renderDateCell = (date: Date, _index: number) => {
    const day = date.getDay();
    const isTodayDate = isToday(date);
    const isSelectedDate = isSameDay(selectedDate, date);
    const isSelectedToday = isToday(selectedDate);
    const shouldShowCircle = isSelectedToday ? isTodayDate : isSelectedDate;

    const textColor = shouldShowCircle ? 'white' : getDateTextColor(day);
    const bgColor = shouldShowCircle ? DATE_COLORS.selected : 'transparent';

    const schedules = getSchedulesForDate(date, calendarItems);

    return (
      <>
        <div className="px-1">
          <button
            type="button"
            onClick={() => setSelectedDate(date)}
            className="2xl:size-12 2xl:text-[1.075125rem] mb-1 flex size-6 cursor-pointer items-center justify-center rounded-full text-[0.553375rem] transition-[background-color,color] md:size-10 md:text-[1.075125rem] lg:size-10 lg:text-[1.075125rem] xl:size-10 xl:text-[1.075125rem]"
            style={{ backgroundColor: bgColor, color: textColor }}
            aria-label={`${date.getDate()}일 선택`}
            aria-current={isTodayDate ? 'date' : undefined}
          >
            {date.getDate()}
          </button>
        </div>
        <div
          className="relative w-full overflow-visible"
          style={{
            height: '28px',
            marginLeft: '-0.25rem',
            marginRight: '-0.25rem',
          }}
        >
          <div className="absolute inset-0 flex flex-col">
            {schedules.map((schedule, scheduleIndex) => {
              const color = CATEGORY_COLORS[schedule.calendarCategory];
              const isStart = schedule.isStart;
              const isEnd = schedule.isEnd;

              const gapPx = 4;
              const barHeight = 4;
              const topOffset = scheduleIndex * (barHeight + gapPx);

              let barStyle = 'absolute';
              if (isStart && isEnd) {
                barStyle += ' rounded-full left-0 right-0';
              } else if (isStart) {
                barStyle += ' rounded-l-full left-0 -right-[0.25rem]';
              } else if (isEnd) {
                barStyle += ' rounded-r-full -left-[0.25rem] right-0';
              } else {
                barStyle += ' rounded-none -left-[0.25rem] -right-[0.25rem]';
              }

              return (
                <div
                  key={`${schedule.calenderId}-${scheduleIndex}`}
                  className={cn(barStyle)}
                  style={{
                    backgroundColor: color,
                    top: `${topOffset}px`,
                    height: '4px',
                  }}
                />
              );
            })}
          </div>
        </div>
      </>
    );
  };

  const formattedDate = formatMonthYear(selectedDate);

  return (
    <div className="flex w-full min-w-[350px] shrink-0 flex-col md:w-[602px]">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-center gap-[3.875rem]">
          <button
            type="button"
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
            type="button"
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
