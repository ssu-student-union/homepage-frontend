import { isValid, getDate, getMonth, getYear } from 'date-fns';

/**
 * Date 객체를 YYYYMMDD 형식의 문자열로 변환합니다 (구분자 없음).
 * @param date - 변환할 Date 객체
 * @returns YYYYMMDD 형식의 문자열 (예: "20251130")
 */
export const formatDateToYYYYMMDD = (date: Date): string => {
  if (!isValid(date)) {
    throw new Error('Invalid date format');
  }
  const year = getYear(date);
  const month = getMonth(date) + 1;
  const day = getDate(date);
  return `${year}${month.toString().padStart(2, '0')}${day.toString().padStart(2, '0')}`;
};

/**
 * 문자열 날짜를 YYYY/MM/DD 형식으로 변환합니다.
 * @param basedTime - 변환할 날짜 문자열
 * @returns YYYY/MM/DD 형식의 문자열 (예: "2025/11/30")
 */
export const formatYYYYMMDD = (basedTime: string): string => {
  const date = new Date(basedTime);

  if (isValid(date)) {
    return `${getYear(date).toString().padStart(2, '0')}/${(getMonth(date) + 1).toString().padStart(2, '0')}/${getDate(
      date
    )
      .toString()
      .padStart(2, '0')}`;
  }
  throw new Error('Invalid date format');
};
