import { CalendarItem } from '../types';
import { CATEGORY_PRIORITY, MAX_SCHEDULES_PER_DATE } from '../const/const';

/**
 * 월 전체 일정을 분석하여 각 일정의 고정 높이 인덱스를 반환하는 함수
 *
 * @description
 * 같은 일정은 항상 같은 높이에 표시되도록 하기 위해,
 * 월 전체 일정을 우선순위에 따라 정렬하고 각 일정에 고정된 높이 인덱스를 할당합니다.
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

    // 우선순위가 같으면 원본 순서 유지
    if (priorityA === priorityB) {
      return 0;
    }

    return priorityA - priorityB;
  });

  // 각 일정에 고정 높이 인덱스 할당 (최대 MAX_SCHEDULES_PER_DATE개까지만)
  const heightMap = new Map<number, number>();
  sortedItems.slice(0, MAX_SCHEDULES_PER_DATE).forEach((item, index) => {
    heightMap.set(item.calenderId, index);
  });

  return heightMap;
}
