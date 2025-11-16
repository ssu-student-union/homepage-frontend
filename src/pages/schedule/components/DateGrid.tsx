import { addMonths, subMonths, isSameMonth, getYear, getMonth, isToday, isSameDay } from 'date-fns';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';
import { useCalendar } from '@/pages/schedule/hook/useCalendar';
import { cn } from '@/libs/utils';
import { CATEGORY_COLORS, DATE_COLORS } from '../const/const';
import s from './DateGrid.module.css';

type Props = {
  selectedDate: Date;
  setSelectedDate: (d: Date) => void;
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
};

export function DateGrid({ selectedDate, setSelectedDate, weekStartsOn = 0 }: Props) {
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
        <div className={cn('grid grid-cols-7 place-items-center', s.weekday)}>
          {weekDays.map((day, index) => {
            const isSunday = index === 0;
            const isSaturday = index === 6;
            const color = isSunday ? DATE_COLORS.sunday : isSaturday ? DATE_COLORS.saturday : '#6B7280';
            return (
              <div key={index} style={{ color }}>
                {day}
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {monthMatrix.map((date, index) => {
            const isCurrentMonth = isSameMonth(selectedDate, date);
            const day = date.getDay();
            const isTodayDate = isToday(date);
            const isSelectedDate = isSameDay(selectedDate, date);
            const isSelectedToday = isToday(selectedDate);
            const shouldShowCircle = isSelectedToday ? isTodayDate : isSelectedDate;

            if (!isCurrentMonth) {
              return <div key={index} className="flex flex-col items-center gap-0.5" />;
            }

            const textColor = shouldShowCircle ? 'white' : getDateTextColor(day);
            const bgColor = shouldShowCircle ? DATE_COLORS.selected : 'transparent';

            return (
              <div key={index} className="flex flex-col items-center gap-0.5">
                <button
                  onClick={() => setSelectedDate(date)}
                  className={cn(s.date, 'cursor-pointer transition-colors')}
                  style={{ backgroundColor: bgColor, color: textColor }}
                >
                  {date.getDate()}
                </button>
                <div className="flex h-1 w-full gap-0.5" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
