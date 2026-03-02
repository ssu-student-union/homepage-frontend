import { CalendarItem } from '../../types';
import { getScheduleHeightMap } from '../../utils/getScheduleHeightMap';
import { DateGridBase, type DateGridBaseProps } from './DateGridBase';
import { CalendarHeader } from './CalendarHeader';
import { useCalendarHeader } from './useCalendarHeader';
import { CategoryLegend } from './CategoryLegend';
import { DateCell } from './DateCell';
import { useMemo } from 'react';

export interface ScheduleDateGridProps extends Omit<DateGridBaseProps, 'renderDateCell' | 'showCategoryLegend'> {
  calendarItems: CalendarItem[];
}

/**
 * 일정 표시용 달력 그리드 컴포넌트
 *
 * @description
 * DateGridBase를 사용하여 일정을 표시하는 달력을 렌더링합니다.
 * 각 날짜 아래에 해당 날짜의 일정을 색상 바로 표시합니다.
 */
export function ScheduleDateGrid({
  selectedDate,
  setSelectedDate,
  weekStartsOn,
  calendarItems,
}: ScheduleDateGridProps) {
  // 월 전체 일정을 분석하여 각 일정의 고정 높이 맵 생성
  const scheduleHeightMap = useMemo(() => getScheduleHeightMap(calendarItems), [calendarItems]);

  const renderDateCell = (date: Date, _index: number) => {
    return (
      <DateCell
        date={date}
        selectedDate={selectedDate}
        calendarItems={calendarItems}
        scheduleHeightMap={scheduleHeightMap}
        onSelectDate={setSelectedDate}
      />
    );
  };

  const { handlePreviousMonth, handleNextMonth } = useCalendarHeader(selectedDate, setSelectedDate);

  return (
    <div className="flex w-full min-w-[350px] shrink-0 flex-col md:w-[602px]">
      <div className="flex flex-col gap-4">
        <CalendarHeader
          selectedDate={selectedDate}
          onPreviousMonth={handlePreviousMonth}
          onNextMonth={handleNextMonth}
        />
        <CategoryLegend />
      </div>

      <div className="h-5 border-b border-gray-200" />

      <DateGridBase
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        weekStartsOn={weekStartsOn}
        renderDateCell={renderDateCell}
        showCategoryLegend={false}
      />
    </div>
  );
}
