import { addMonths, subMonths, isSameMonth, getYear, getMonth, isToday, isSameDay } from 'date-fns';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';
import { useCalendar } from '@/pages/schedule/hook/useCalendar';
import { cn } from '@/libs/utils';
import { CATEGORY_COLORS, DATE_COLORS } from '../const/const';
import { CalendarItem } from '../types';
import { getSchedulesForDate } from '../utils/getSchedulesForDate';
import s from './DateGrid.module.css';

type Props = {
  selectedDate: Date;
  setSelectedDate: (d: Date) => void;
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  calendarItems?: CalendarItem[];
};

export function DateGrid({ selectedDate, setSelectedDate, weekStartsOn = 0, calendarItems = [] }: Props) {
  const { weekDays, monthMatrix } = useCalendar({ selectedDate, weekStartsOn });

  const year = getYear(selectedDate);
  const month = getMonth(selectedDate) + 1;
  const formattedDate = `${year}.${month.toString().padStart(2, '0')}`;

  const getDateTextColor = (day: number) => {
    if (day === 0) return DATE_COLORS.sunday;
    if (day === 6) return DATE_COLORS.saturday;
    return DATE_COLORS.default;
  };

  return (
    <div className={cn('flex flex-col', s.container)}>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-center gap-[3.875rem]">
          <button
            className="rounded p-1 hover:bg-gray-100"
            onClick={() => setSelectedDate(subMonths(selectedDate, 1))}
            aria-label="이전 달"
          >
            <CaretLeft weight="bold" className="size-4 text-gray-700" />
          </button>
          <div className={s.header}>{formattedDate}</div>
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
            <div key={label} className={s.category}>
              <span>{label}</span>
              <div className={cn(s.dot)} style={{ backgroundColor: color }} />
            </div>
          ))}
        </div>
      </div>

      <div className="h-5 border-b border-gray-200" />

      <div className="flex flex-col gap-3 pt-3">
        <div className={cn('grid grid-cols-7 place-items-center gap-x-0', s.weekday)}>
          {weekDays.map((day, index) => {
            const isSunday = index === 0;
            const isSaturday = index === 6;
            const color = isSunday ? DATE_COLORS.sunday : isSaturday ? DATE_COLORS.saturday : '#6B7280';
            return (
              <div key={index} className="px-1" style={{ color }}>
                {day}
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-7 gap-x-0 gap-y-3">
          {monthMatrix.map((date, index) => {
            const isCurrentMonth = isSameMonth(selectedDate, date);
            const day = date.getDay();
            const isTodayDate = isToday(date);
            const isSelectedDate = isSameDay(selectedDate, date);
            const isSelectedToday = isToday(selectedDate);
            const shouldShowCircle = isSelectedToday ? isTodayDate : isSelectedDate;

            if (!isCurrentMonth) {
              return <div key={index} className="flex flex-col items-center" />;
            }

            const textColor = shouldShowCircle ? 'white' : getDateTextColor(day);
            const bgColor = shouldShowCircle ? DATE_COLORS.selected : 'transparent';
            const schedules = getSchedulesForDate(date, calendarItems);

            return (
              <div key={index} className="flex flex-col items-center">
                <div className="px-1">
                  <button
                    onClick={() => setSelectedDate(date)}
                    className={cn(s.date, 'mb-1 cursor-pointer transition-colors')}
                    style={{ backgroundColor: bgColor, color: textColor }}
                  >
                    {date.getDate()}
                  </button>
                </div>
                <div
                  className="relative w-full overflow-visible"
                  style={{
                    height: schedules.length > 1 ? `${4 + (schedules.length - 1) * 8}px` : '4px',
                    marginLeft: '-0.25rem',
                    marginRight: '-0.25rem',
                  }}
                >
                  <div className="absolute inset-0 flex flex-col">
                    {schedules.map((schedule, scheduleIndex) => {
                      const color = CATEGORY_COLORS[schedule.calendarCategory];
                      const isStart = schedule.isStart;
                      const isEnd = schedule.isEnd;

                      // TODO: 스타일 상수 수정
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
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
