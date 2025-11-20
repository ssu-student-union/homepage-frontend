import { getYear, getMonth } from 'date-fns';

/**
 * Date 객체를 YYYYMM 형식의 문자열로 변환합니다.
 * @param date - 변환할 Date 객체
 * @returns YYYYMM 형식의 문자열 (예: "202511")
 */
export function formatDateToYYYYMM(date: Date): string {
  const year = getYear(date);
  const month = getMonth(date) + 1;
  return `${year}${month.toString().padStart(2, '0')}`;
}
