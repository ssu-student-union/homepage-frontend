import { CalendarItem } from '../types';
import { CATEGORY_PRIORITY } from '../const/const';
import { parseISO, addDays, format } from 'date-fns';

/**
 * 두 날짜 사이의 모든 날짜 문자열 배열을 반환
 */
function getDatesBetween(startDateStr: string, endDateStr: string): string[] {
  const dates: string[] = [];
  const start = parseISO(startDateStr);
  const end = parseISO(endDateStr);
  let current = start;
  while (current <= end) {
    dates.push(format(current, 'yyyy-MM-dd'));
    current = addDays(current, 1);
  }
  return dates;
}

/**
 * 월 전체 일정을 분석하여 각 일정의 고정 높이 인덱스를 반환하는 함수
 *
 * @description
 * 같은 일정은 항상 같은 높이에 표시되도록 하기 위해,
 * 겹치는 날짜의 일정들을 고려하여 높이 인덱스를 할당합니다.
 * 우선순위가 높은 일정(학사 > 총학생회 > 공휴일/기념일)이 낮은 인덱스를 받습니다.
 *
 * @param calendarItems - 전체 일정 목록
 * @returns 일정 ID를 키로 하고 높이 인덱스를 값으로 하는 맵
 */
export function getScheduleHeightMap(calendarItems: CalendarItem[]): Map<number, number> {
  // 일정을 우선순위에 따라 정렬
  const sortedItems = [...calendarItems].sort((a, b) => {
    const priorityA =
      CATEGORY_PRIORITY[a.calendarCategory as keyof typeof CATEGORY_PRIORITY] ?? Number.MAX_SAFE_INTEGER;
    const priorityB =
      CATEGORY_PRIORITY[b.calendarCategory as keyof typeof CATEGORY_PRIORITY] ?? Number.MAX_SAFE_INTEGER;

    if (priorityA !== priorityB) {
      return priorityA - priorityB;
    }

    // 우선순위가 같으면 시작일 순
    return a.startDate.localeCompare(b.startDate);
  });

  const heightMap = new Map<number, number>();
  // 각 날짜별로 사용된 인덱스를 추적
  const dateIndexUsage = new Map<string, Set<number>>();

  for (const item of sortedItems) {
    const itemDates = getDatesBetween(item.startDate, item.endDate);

    // 이 일정의 모든 날짜에서 사용된 인덱스들을 모음
    const usedIndices = new Set<number>();
    for (const date of itemDates) {
      const indices = dateIndexUsage.get(date);
      if (indices) {
        indices.forEach((idx) => usedIndices.add(idx));
      }
    }

    // 사용되지 않은 가장 작은 인덱스 찾기
    let index = 0;
    while (usedIndices.has(index)) {
      index++;
    }

    // 인덱스 할당
    heightMap.set(item.calenderId, index);

    // 이 일정의 모든 날짜에 이 인덱스를 기록
    for (const date of itemDates) {
      if (!dateIndexUsage.has(date)) {
        dateIndexUsage.set(date, new Set());
      }
      dateIndexUsage.get(date)!.add(index);
    }
  }

  return heightMap;
}
