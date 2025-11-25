import { getMonth, getDate, parseISO, isSameDay } from 'date-fns';
import { MONTH_NAMES } from '../const';

/**
 * 시작일과 종료일을 한국어 형식의 날짜 범위 문자열로 변환합니다.
 * @param startDate - 시작일 (ISO 문자열)
 * @param endDate - 종료일 (ISO 문자열)
 * @returns "11월 9일 ~ 11월 13일" 형식의 문자열
 */
export function formatDateRange(startDate: string, endDate: string): string {
  const start = parseISO(startDate);
  const end = parseISO(endDate);

  const startMonth = MONTH_NAMES[getMonth(start)];
  const startDay = getDate(start);
  const endMonth = MONTH_NAMES[getMonth(end)];
  const endDay = getDate(end);

  // 같은 날이면 하나만 표시
  if (isSameDay(start, end)) {
    return `${startMonth} ${startDay}일`;
  }

  // 항상 시작일과 종료일 모두 월과 일을 표시
  return `${startMonth} ${startDay}일 ~ ${endMonth} ${endDay}일`;
}
