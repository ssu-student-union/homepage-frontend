import { parseISO, isWithinInterval, isSameDay, addDays } from 'date-fns';
import { CalendarItem } from '../types';
import { CATEGORY_PRIORITY, MAX_SCHEDULES_PER_DATE } from '../const/const';

export type ScheduleWithDateInfo = CalendarItem & {
  isStart: boolean;
  isEnd: boolean;
  hasNext: boolean;
};

/**
 * 특정 날짜에 대한 일정 정보를 가져오는 함수
 * @param date - 조회할 날짜
 * @param calendarItems - 전체 일정 목록
 * @param maxCount - 반환할 최대 일정 수 (기본값: 4)
 * @returns 해당 날짜에 포함된 일정 목록 (시작일, 종료일, 다음 날 포함 여부 정보 포함)
 *          카테고리별로 정렬되며 최대 maxCount개까지만 반환
 */
export function getSchedulesForDate(
  date: Date,
  calendarItems: CalendarItem[],
  maxCount: number = MAX_SCHEDULES_PER_DATE
): ScheduleWithDateInfo[] {
  const schedules = calendarItems.flatMap((item) => {
    const startDate = parseISO(item.startDate);
    const endDate = parseISO(item.endDate);

    if (!isWithinInterval(date, { start: startDate, end: endDate })) {
      return [];
    }

    const isStart = isSameDay(date, startDate);
    const isEnd = isSameDay(date, endDate);
    const nextDate = addDays(date, 1);
    const hasNext = isWithinInterval(nextDate, { start: startDate, end: endDate });

    return [
      {
        ...item,
        isStart,
        isEnd,
        hasNext,
      },
    ];
  });

  // 카테고리별로 정렬 (학사 > 총학생회 > 공휴일/기념일)
  // 동일 카테고리 내에서는 원본 순서 유지 (stable sort)
  schedules.sort((a, b) => {
    const priorityA =
      CATEGORY_PRIORITY[a.calendarCategory as keyof typeof CATEGORY_PRIORITY] ?? Number.MAX_SAFE_INTEGER;
    const priorityB =
      CATEGORY_PRIORITY[b.calendarCategory as keyof typeof CATEGORY_PRIORITY] ?? Number.MAX_SAFE_INTEGER;
    return priorityA - priorityB;
  });

  return schedules.slice(0, maxCount);
}
