import { isToday, isSameDay } from 'date-fns';
import { cn } from '@/libs/utils';
import { DATE_COLORS, CATEGORY_COLORS, CALENDAR_DATE_BUTTON_STYLES } from '../../const/const';
import { CalendarItem } from '../../types';
import { getSchedulesForDate } from '../../utils/getSchedulesForDate';

interface DateCellProps {
  date: Date;
  selectedDate: Date;
  calendarItems: CalendarItem[];
  scheduleHeightMap: Map<number, number>;
  onSelectDate: (date: Date) => void;
}

const getDateTextColor = (day: number) => {
  if (day === 0) return DATE_COLORS.gray;
  if (day === 6) return DATE_COLORS.gray;
  return DATE_COLORS.default;
};

/**
 * 달력 날짜 셀 컴포넌트
 *
 * @description
 * 날짜 버튼과 해당 날짜의 일정을 색상 바로 표시합니다.
 */
export function DateCell({ date, selectedDate, calendarItems, scheduleHeightMap, onSelectDate }: DateCellProps) {
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
          onClick={() => onSelectDate(date)}
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
}

