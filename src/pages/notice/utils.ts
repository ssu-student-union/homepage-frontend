export const isToday = (date: string) => {
  const today = new Date();
  const postDate = new Date(date);
  return (
    today.getFullYear() === postDate.getFullYear() &&
    today.getMonth() === postDate.getMonth() &&
    today.getDate() === postDate.getDate()
  );
};
