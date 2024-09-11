export const isToday = (dateString: string): boolean => {
  const today = new Date();
  const [datePart] = dateString.split(' ');
  const [year, month, day] = datePart.split('/').map(Number);

  return today.getFullYear() === year && today.getMonth() + 1 === month && today.getDate() === day;
};
