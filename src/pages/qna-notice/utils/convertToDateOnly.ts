import dayjs from 'dayjs';

export function convertToDateOnly(dateString: string): Date {
  const [datePart] = dateString.split(' ');
  return dayjs(datePart, 'YYYY/MM/DD').startOf('day').toDate();
}

export function convertToDate(dateString: string): Date {
  const parsed = dayjs(dateString, 'YYYY/MM/DD HH:mm:ss');
  return parsed.second(0).millisecond(0).toDate();
}
