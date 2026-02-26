import { subMonths, addMonths } from 'date-fns';

/**
 * 달력 헤더를 위한 헬퍼 훅
 * selectedDate를 기반으로 이전/다음 달 이동 함수를 제공합니다.
 */
export function useCalendarHeader(selectedDate: Date, setSelectedDate: (date: Date) => void) {
  const handlePreviousMonth = () => {
    setSelectedDate(subMonths(selectedDate, 1));
  };

  const handleNextMonth = () => {
    setSelectedDate(addMonths(selectedDate, 1));
  };

  return {
    handlePreviousMonth,
    handleNextMonth,
  };
}
