import { isToday, isSameDay, addDays } from 'date-fns';
import { cn } from '@/libs/utils';
import { DATE_COLORS, CATEGORY_COLORS, CALENDAR_DATE_BUTTON_STYLES, MAX_SCHEDULES_PER_DATE } from '../../const/const';
import { CalendarItem } from '../../types';
import { getSchedulesForDate } from '../../utils/getSchedulesForDate';

interface DateCellProps {
  date: Date;
  selectedDate: Date;
  calendarItems: CalendarItem[];
  scheduleHeightMap: Map<number, number>;
  onSelectDate: (date: Date) => void;
}

const getDateTextColor = (day: number) => {
  if (day === 0) return DATE_COLORS.gray;
  if (day === 6) return DATE_COLORS.gray;
  return DATE_COLORS.default;
};

/**
 * 달력 날짜 셀 컴포넌트
 *
 * @description
 * 날짜 버튼과 해당 날짜의 일정을 색상 바로 표시합니다.
 */
export function DateCell({ date, selectedDate, calendarItems, scheduleHeightMap, onSelectDate }: DateCellProps) {
  const day = date.getDay();
  const isTodayDate = isToday(date);
  const isSelectedDate = isSameDay(selectedDate, date);
  const isSelectedToday = isToday(selectedDate);
  const shouldShowCircle = isSelectedToday ? isTodayDate : isSelectedDate;

  const textColor = shouldShowCircle ? 'white' : getDateTextColor(day);
  const bgColor = shouldShowCircle ? DATE_COLORS.selected : 'transparent';

  const schedules = getSchedulesForDate(date, calendarItems);

  // 정렬 함수 (재사용)
  const sortByPriority = (a: CalendarItem, b: CalendarItem) => {
    const indexA = scheduleHeightMap.get(a.calenderId) ?? Number.MAX_SAFE_INTEGER;
    const indexB = scheduleHeightMap.get(b.calenderId) ?? Number.MAX_SAFE_INTEGER;
    return indexA - indexB;
  };

  // 이 날짜에 표시할 일정들: 우선순위 순으로 정렬 후 상위 4개만 선택 (부분 표시 허용)
  const displaySchedules = schedules.sort(sortByPriority).slice(0, MAX_SCHEDULES_PER_DATE);

  // 이전/다음 날짜에서 표시되는 일정 목록 (시각적 시작/끝 판단용)
  const prevDate = addDays(date, -1);
  const prevDisplaySchedules = getSchedulesForDate(prevDate, calendarItems)
    .sort(sortByPriority)
    .slice(0, MAX_SCHEDULES_PER_DATE);

  const nextDate = addDays(date, 1);
  const nextDisplaySchedules = getSchedulesForDate(nextDate, calendarItems)
    .sort(sortByPriority)
    .slice(0, MAX_SCHEDULES_PER_DATE);

  return (
    <>
      <div className="px-1">
        <button
          type="button"
          onClick={() => onSelectDate(date)}
          className={cn('mb-1', CALENDAR_DATE_BUTTON_STYLES.base)}
          style={{ backgroundColor: bgColor, color: textColor }}
          aria-label={`${date.getDate()}일 선택`}
          aria-current={isTodayDate ? 'date' : undefined}
        >
          {date.getDate()}
        </button>
      </div>
      <div
        className="relative w-full overflow-visible"
        style={{
          height: '28px',
        }}
      >
        <div className="absolute inset-0 flex flex-col items-center">
          {displaySchedules.map((schedule, displayIndex) => {
            const color = CATEGORY_COLORS[schedule.calendarCategory];

            // 시각적 시작/끝 판단:
            // - 실제 시작/끝
            // - 이전/다음 날짜에서 표시되지 않거나 높이가 다른 경우
            // - 주가 바뀌는 경우 (일요일=주 시작, 토요일=주 끝)
            const prevDisplayIndex = prevDisplaySchedules.findIndex((s) => s.calenderId === schedule.calenderId);
            const nextDisplayIndex = nextDisplaySchedules.findIndex((s) => s.calenderId === schedule.calenderId);
            const wasDisplayedAtSameHeight = prevDisplayIndex === displayIndex;
            const willBeDisplayedAtSameHeight = nextDisplayIndex === displayIndex;
            const isSunday = day === 0; // 주의 시작
            const isSaturday = day === 6; // 주의 끝
            const visualStart = schedule.isStart || !wasDisplayedAtSameHeight || isSunday;
            const visualEnd = schedule.isEnd || !willBeDisplayedAtSameHeight || isSaturday;

            // 각 날짜에서의 표시 순서를 사용하여 배치 (부분 표시 방식)
            const gapPx = 4;
            const barHeight = 4;
            const topOffset = displayIndex * (barHeight + gapPx);

            // 막대 스타일: 기본 너비 3.875rem, 이어지는 막대는 양 옆으로 확장
            let barStyle = 'absolute';
            let leftStyle = '50%';
            let rightStyle = 'auto';
            let transform = 'translateX(-50%)';
            let width = '3.875rem';

            if (visualStart && visualEnd) {
              // 하루짜리: 고정 너비, 중앙 정렬, 양쪽 둥글게
              barStyle += ' rounded-full';
            } else if (visualStart) {
              // 시작: 왼쪽 둥글게, 오른쪽으로 확장
              barStyle += ' rounded-l-full';
              leftStyle = 'calc(50% - 1.9375rem)'; // 중앙에서 절반 너비만큼 왼쪽으로
              rightStyle = '-0.5rem';
              transform = 'none';
              width = 'auto';
            } else if (visualEnd) {
              // 끝: 오른쪽 둥글게, 왼쪽으로 확장
              barStyle += ' rounded-r-full';
              leftStyle = '-0.5rem';
              rightStyle = 'calc(50% - 1.9375rem)';
              transform = 'none';
              width = 'auto';
            } else {
              // 중간: 양쪽으로 확장
              barStyle += ' rounded-none';
              leftStyle = '-0.5rem';
              rightStyle = '-0.5rem';
              transform = 'none';
              width = 'auto';
            }

            return (
              <div
                key={`${schedule.calenderId}-${date.getTime()}`}
                className={cn(barStyle)}
                style={{
                  backgroundColor: color,
                  top: `${topOffset}px`,
                  height: '4px',
                  left: leftStyle,
                  right: rightStyle,
                  transform: transform,
                  width: width,
                }}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

