import { isToday, isSameDay } from 'date-fns';
import { cn } from '@/libs/utils';
import { DATE_COLORS, CATEGORY_COLORS, CALENDAR_DATE_BUTTON_STYLES } from '../../const/const';
import { CalendarItem } from '../../types';
import { getSchedulesForDate } from '../../utils/getSchedulesForDate';
import { getScheduleHeightMap } from '../../utils/getScheduleHeightMap';
import { DateGridBase, type DateGridBaseProps } from './DateGridBase';
import { CalendarHeader } from './CalendarHeader';
import { useCalendarHeader } from './useCalendarHeader';
import { CategoryLegend } from './CategoryLegend';
import { useMemo } from 'react';

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
  // 월 전체 일정을 분석하여 각 일정의 고정 높이 맵 생성
  const scheduleHeightMap = useMemo(() => getScheduleHeightMap(calendarItems), [calendarItems]);

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
            className={cn('mb-1', CALENDAR_DATE_BUTTON_STYLES.base)}
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
            {schedules.map((schedule) => {
              const color = CATEGORY_COLORS[schedule.calendarCategory];
              const isStart = schedule.isStart;
              const isEnd = schedule.isEnd;

              // 고정된 높이 인덱스 사용
              const heightIndex = scheduleHeightMap.get(schedule.calenderId) ?? 0;
              const gapPx = 4;
              const barHeight = 4;
              const topOffset = heightIndex * (barHeight + gapPx);

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
                  key={`${schedule.calenderId}-${date.getTime()}`}
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

  const { handlePreviousMonth, handleNextMonth } = useCalendarHeader(selectedDate, setSelectedDate);

  return (
    <div className="flex w-full min-w-[350px] shrink-0 flex-col md:w-[602px]">
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
