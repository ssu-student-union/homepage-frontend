import { isSameMonth } from 'date-fns';
import { useCalendar } from '@/pages/schedule/hook/useCalendar';
import { DATE_COLORS } from '../../const/const';

export interface DateGridBaseProps {
  selectedDate: Date;
  setSelectedDate: (d: Date) => void;
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  /**
   * 각 날짜 셀을 렌더링하는 함수
   * @param date - 렌더링할 날짜
   * @param index - 그리드 내 인덱스
   * @returns React 노드
   */
  renderDateCell: (date: Date, index: number) => React.ReactNode;
  /**
   * 카테고리 범례 표시 여부 (기본값: true)
   */
  showCategoryLegend?: boolean;
}

/**
 * 기본 달력 그리드 컴포넌트
 *
 * @description
 * 달력의 기본 구조(헤더, 요일, 날짜 그리드)만 담당합니다.
 * 각 날짜 셀의 렌더링은 `renderDateCell` prop을 통해 외부에서 제어합니다.
 */
export function DateGridBase({
  selectedDate,
  setSelectedDate: _setSelectedDate,
  weekStartsOn = 0,
  renderDateCell,
  showCategoryLegend: _showCategoryLegend = true,
}: DateGridBaseProps) {
  const { weekDays, monthMatrix } = useCalendar({ selectedDate, weekStartsOn });

  return (
    <div className="flex w-full flex-col gap-3 pt-3">
      <div className="2xl:text-[1.375rem] grid grid-cols-7 place-items-center gap-x-0 text-xs font-semibold md:text-sm lg:text-lg xl:text-base">
        {weekDays.map((day, index) => {
          const isSunday = index === 0;
          const isSaturday = index === 6;
          const color = isSunday ? DATE_COLORS.sunday : isSaturday ? DATE_COLORS.gray : '#6B7280';
          return (
            <div key={index} className="px-1" style={{ color }}>
              {day}
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-7 gap-x-0 gap-y-3">
        {monthMatrix.map((date, index) => {
          const isCurrentMonth = isSameMonth(selectedDate, date);

          if (!isCurrentMonth) {
            return <div key={index} aria-hidden="true" />;
          }

          return (
            <div key={index} className="flex flex-col items-center">
              {renderDateCell(date, index)}
            </div>
          );
        })}
      </div>
    </div>
  );
}
