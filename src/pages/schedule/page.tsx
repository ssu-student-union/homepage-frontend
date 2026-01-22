import { BoardHeader } from '@/components/BoardHeader';
import { Container } from '@/containers/new/Container';
import { useState, useMemo } from 'react';
import { Category } from '@/components/Category';
import { ScheduleDetailCard } from './components/display/ScheduleDetailCard';
import { ScheduleCalendarSection } from './components/sections/ScheduleCalendarSection';
import { ScheduleActionButtons } from './components/sections/ScheduleActionButtons';
import { ScheduleDeleteDialog } from './components/sections/ScheduleDeleteDialog';
import { SCHEDULE_CATEGORIES, type ScheduleCategory } from './const/const';
import { useGetCalendars } from './hook/query/useGetCalendars';
import { formatDateRange } from './utils/formatDateRange';
import { startOfMonth } from 'date-fns';
import { CalendarItem } from './types';
import { useDeleteSchedule } from './hook/mutations/useDeleteSchedule';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { checkSchedulePermission } from './utils/checkSchedulePermission';
import { SCHEDULE_SUCCESS_MESSAGES } from './const/const';
import { handleScheduleError } from './utils/handleScheduleError';

export function SchedulePage() {
  const queryClient = useQueryClient();
  const [selectedCategory, setSelectedCategory] = useState<ScheduleCategory>('전체');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [clickedScheduleId, setClickedScheduleId] = useState<number | null>(null);
  const [hoveredScheduleId, setHoveredScheduleId] = useState<number | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // 현재 달의 첫 번째 날을 기준으로 API 요청 (달 변경 시 자동으로 재요청됨)
  const monthStart = useMemo(() => startOfMonth(currentDate), [currentDate]);
  const { data: calendarData, isLoading } = useGetCalendars({ date: monthStart });

  // 삭제 mutation
  const { mutate: deleteSchedule, isPending: isDeleting } = useDeleteSchedule({
    mutationOptions: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['getCalendars'] });
        setClickedScheduleId(null);
        setHoveredScheduleId(null);
        setIsDeleteDialogOpen(false);
        toast.success(SCHEDULE_SUCCESS_MESSAGES.DELETED);
      },
      onError: (error) => {
        handleScheduleError(error, 'delete', '일정 삭제 실패');
      },
    },
  });

  const handleDeleteClick = () => {
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (clickedScheduleId !== null) {
      deleteSchedule({ calendarId: clickedScheduleId });
    }
  };

  const handleListClick = () => {
    setClickedScheduleId(null);
    setHoveredScheduleId(null);
  };

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

  // 달력에 표시할 일정 필터링 (클릭 또는 hover된 일정이 있으면 해당 일정만 표시)
  const selectedScheduleId = clickedScheduleId ?? hoveredScheduleId;
  const calendarsForCalendar = useMemo((): CalendarItem[] => {
    if (selectedScheduleId !== null) {
      return filteredCalendars.filter((item) => item.calenderId === selectedScheduleId);
    }
    return filteredCalendars;
  }, [filteredCalendars, selectedScheduleId]);

  // 일정 관리 권한 확인 (총학생회 또는 중앙집행위원회만 가능)
  const hasSchedulePermission = useMemo(() => checkSchedulePermission(), []);

  // 일정 목록 렌더링 함수
  const renderScheduleList = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center py-8">
          <p className="text-gray-500">로딩 중...</p>
        </div>
      );
    }

    if (filteredCalendars.length === 0) {
      return (
        <div className="flex items-center justify-center py-8">
          <p className="text-xs text-gray-500 md:text-base lg:text-lg">일정이 없습니다.</p>
        </div>
      );
    }

    return filteredCalendars.map((item) => (
      <div key={item.calenderId} className="flex px-8">
        <ScheduleDetailCard
          calenderId={item.calenderId}
          category={item.calendarCategory}
          title={item.title}
          dateRange={formatDateRange(item.startDate, item.endDate)}
          isSelected={clickedScheduleId === item.calenderId}
          isHovered={hoveredScheduleId === item.calenderId}
          onMouseEnter={() => {
            if (clickedScheduleId === null) {
              setHoveredScheduleId(item.calenderId);
            }
          }}
          onMouseLeave={() => {
            if (clickedScheduleId === null) {
              setHoveredScheduleId(null);
            }
          }}
          onClick={() => {
            if (clickedScheduleId === item.calenderId) {
              setClickedScheduleId(null);
              setHoveredScheduleId(null);
            } else {
              setClickedScheduleId(item.calenderId);
              setHoveredScheduleId(null);
            }
          }}
        />
      </div>
    ));
  };

  return (
    <div className="pt-16">
      <BoardHeader
        title="일정"
        className="justify-start border-b border-b-neutral-200 [&_h1]:px-4 [&_h1]:pb-[3.125rem] [&_h1]:text-[2.125rem]"
      />
      <div className="mb-1 flex justify-center px-4 md:px-[72px] lg:px-[200px]">
        <div className="flex w-full justify-center gap-2 px-4 py-5 max-md:overflow-x-auto md:justify-start">
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
      <Container className="pt-0 max-md:px-0 md:pt-14 [&>div]:max-w-none">
        <div className="relative">
          <div className="flex flex-col items-center gap-4 lg:flex-row lg:items-stretch lg:gap-[2.8125rem]">
            <ScheduleCalendarSection
              currentDate={currentDate}
              setCurrentDate={setCurrentDate}
              calendarsForCalendar={calendarsForCalendar}
            />
            <div className="2xl:px-[60px] flex h-[436px] w-full flex-col justify-center md:h-[536px] xl:w-1/2 xl:shrink-0 xl:px-[42px]">
              <div className="flex min-h-0 w-full min-w-[160px] flex-1 flex-col gap-4 overflow-y-auto pb-px">
                {renderScheduleList()}
              </div>
              <ScheduleActionButtons
                hasSchedulePermission={hasSchedulePermission}
                clickedScheduleId={clickedScheduleId}
                isDeleting={isDeleting}
                onDeleteClick={handleDeleteClick}
                onListClick={handleListClick}
              />
            </div>
          </div>
        </div>
      </Container>
      <ScheduleDeleteDialog
        isOpen={isDeleteDialogOpen}
        isDeleting={isDeleting}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}
