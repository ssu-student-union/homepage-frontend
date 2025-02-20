export function convertToDateOnly(dateString: string): Date {
  const [datePart] = dateString.split(' ');
  const [year, month, day] = datePart.split('/').map(Number);
  return new Date(year, month - 1, day);
}

export function convertToDate(dateString: string): Date {
  const [datePart, timePart] = dateString.split(' ');
  const [year, month, day] = datePart.split('/').map(Number);
  // timePart가 "16:29:02"와 같이 오면 시와 분만 사용 (초는 무시)
  const [hour, minute] = timePart.split(':').map(Number);
  return new Date(year, month - 1, day, hour, minute, 0, 0);
}
