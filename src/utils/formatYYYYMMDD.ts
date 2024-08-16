import { isValid, getDate, getMonth, getYear } from 'date-fns';

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
