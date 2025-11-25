import { parseISO, isWithinInterval, isSameDay, addDays } from 'date-fns';
import { CalendarItem } from '../types';

/**
 * 특정 날짜에 대한 일정 정보를 가져오는 함수
 * @param date - 조회할 날짜
 * @param calendarItems - 전체 일정 목록
 * @returns 해당 날짜에 포함된 일정 목록 (시작일, 종료일, 다음 날 포함 여부 정보 포함)
 */
export function getSchedulesForDate(date: Date, calendarItems: CalendarItem[]) {
  return calendarItems
    .map((item) => {
      const startDate = parseISO(item.startDate);
      const endDate = parseISO(item.endDate);
      const isInRange = isWithinInterval(date, { start: startDate, end: endDate });

      if (!isInRange) return null;

      const isStart = isSameDay(date, startDate);
      const isEnd = isSameDay(date, endDate);
      const nextDate = addDays(date, 1);
      const hasNext = isWithinInterval(nextDate, { start: startDate, end: endDate });

      return {
        ...item,
        isStart,
        isEnd,
        hasNext,
      };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);
}


