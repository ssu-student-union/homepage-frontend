import { ScheduleDateGrid } from '../calendar/ScheduleDateGrid';
import { CalendarItem } from '../../types';

interface ScheduleCalendarSectionProps {
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
  calendarsForCalendar: CalendarItem[];
}

export function ScheduleCalendarSection({
  currentDate,
  setCurrentDate,
  calendarsForCalendar,
}: ScheduleCalendarSectionProps) {
  return (
    <div className="flex w-full shrink-0 justify-center self-center px-[3.313rem] md:w-auto md:px-0">
      <ScheduleDateGrid
        selectedDate={currentDate}
        setSelectedDate={setCurrentDate}
        calendarItems={calendarsForCalendar}
      />
    </div>
  );
}

