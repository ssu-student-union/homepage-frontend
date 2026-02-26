import { addMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns';

type UseCalendarOpts = {
  selectedDate: Date;
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
};

export function useCalendar({ selectedDate, weekStartsOn = 0 }: UseCalendarOpts) {
  const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

  const firstDay = startOfMonth(selectedDate);
  const lastDay = endOfMonth(selectedDate);
  const gridStart = startOfWeek(firstDay, { weekStartsOn });
  const gridEnd = endOfWeek(lastDay, { weekStartsOn });
  const monthMatrix = eachDayOfInterval({ start: gridStart, end: gridEnd });

  const yearMonths = Array.from({ length: 12 }).map((_, m) => addMonths(new Date(selectedDate.getFullYear(), 0, 1), m));

  return { weekDays, monthMatrix, yearMonths };
}
