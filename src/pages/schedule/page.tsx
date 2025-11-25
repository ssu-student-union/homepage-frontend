import { BoardHeader } from '@/components/BoardHeader';
import { BoardContainer } from '@/components/BoardContainer';
import { useState, useMemo } from 'react';
import { Category } from '@/components/Category';
import { ScheduleDateGrid } from './components/calendar/ScheduleDateGrid';
import { ScheduleDetailCard } from './components/display/ScheduleDetailCard';
import { SCHEDULE_CATEGORIES, type ScheduleCategory } from './const';
import { useGetCalendars } from './hook/query/useGetCalendars';
import { formatDateRange } from './utils/formatDateRange';
import { startOfMonth } from 'date-fns';
import { CalendarItem } from './types';
import { Pencil } from '@phosphor-icons/react';
import { useNavigate } from 'react-router';
import { Button } from '@/components/ui/button';

export function SchedulePage() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<ScheduleCategory>('전체');
  const [currentDate, setCurrentDate] = useState(new Date());

  // 현재 달의 첫 번째 날을 기준으로 API 요청 (달 변경 시 자동으로 재요청됨)
  const monthStart = useMemo(() => startOfMonth(currentDate), [currentDate]);
  const { data: calendarData, isLoading } = useGetCalendars({ date: monthStart });

  // 카테고리 필터링
  const filteredCalendars = useMemo((): CalendarItem[] => {
    if (!calendarData?.calendarEventResponseList) return [];

    if (selectedCategory === '전체') {
      return calendarData.calendarEventResponseList;
    }

    return calendarData.calendarEventResponseList.filter(
      (item: CalendarItem) => item.calendarCategory === selectedCategory
    );
  }, [calendarData, selectedCategory]);

  return (
    <>
      <BoardHeader title="일정" className="border-b-neutral-200 max-md:px-5 md:border-b" />
      <div className="mb-1 flex justify-center px-4 md:px-[72px] lg:px-[200px]">
        <div className="flex w-full max-w-[1040px] gap-2 py-5 max-md:overflow-x-auto">
          {SCHEDULE_CATEGORIES.map((category) => (
            <Category
              key={category}
              isActive={selectedCategory === category}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Category>
          ))}
        </div>
      </div>
      <BoardContainer isEmpty={false}>
        <div className="relative">
          <div className="flex flex-col items-center gap-4 lg:flex-row lg:items-stretch lg:gap-[2.8125rem]">
            <div className="2xl:px-[60px] w-full shrink-0 px-0 md:w-[602px] md:min-w-[602px] md:max-w-[602px] lg:px-0 xl:px-[42px]">
              <ScheduleDateGrid
                selectedDate={currentDate}
                setSelectedDate={setCurrentDate}
                calendarItems={filteredCalendars}
              />
            </div>
            <div className="2xl:px-[60px] flex w-full justify-center lg:min-w-0 lg:shrink lg:flex-col lg:px-0 xl:px-[42px]">
              <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto md:w-[33.625rem] lg:w-auto lg:min-w-[23.125rem] lg:max-w-[33.625rem] lg:basis-[33.625rem]">
                {isLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <p className="text-gray-500">로딩 중...</p>
                  </div>
                ) : filteredCalendars.length === 0 ? (
                  <div className="flex items-center justify-center py-8">
                    <p className="text-gray-500">일정이 없습니다.</p>
                  </div>
                ) : (
                  filteredCalendars.map((item) => (
                    <ScheduleDetailCard
                      key={item.calenderId}
                      category={item.calendarCategory}
                      title={item.title}
                      dateRange={formatDateRange(item.startDate, item.endDate)}
                    />
                  ))
                )}
              </div>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={() => navigate(`/schedule/edit`)}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2 md:absolute md:bottom-4 md:right-4"
          >
            <Pencil className="size-4" />
            <p>글쓰기</p>
          </Button>
        </div>
      </BoardContainer>
    </>
  );
}
