import { BoardHeader } from '@/components/BoardHeader';
import { BoardContainer } from '@/components/BoardContainer';
import { useState, useMemo } from 'react';
import { Category } from '@/components/Category';
import { ScheduleDateGrid } from './components/calendar/ScheduleDateGrid';
import { ScheduleDetailCard } from './components/display/ScheduleDetailCard';
import { SCHEDULE_CATEGORIES, type ScheduleCategory } from './const/const';
import { useGetCalendars } from './hook/query/useGetCalendars';
import { formatDateRange } from './utils/formatDateRange';
import { startOfMonth } from 'date-fns';
import { CalendarItem } from './types';
import { Pencil } from '@phosphor-icons/react';
import { useNavigate } from 'react-router';
import { Button } from '@/components/ui/button';
import { useDeleteSchedule } from './hook/mutations/useDeleteSchedule';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { checkSchedulePermission } from './utils/checkSchedulePermission';
import { AxiosError } from 'axios';
import { ApiError } from '@/hooks/new/useStuQuery';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export function SchedulePage() {
  const navigate = useNavigate();
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
        toast.success('일정이 삭제되었습니다.');
      },
      onError: (error) => {
        console.error('일정 삭제 실패:', error);
        if (error && typeof error === 'object' && 'isSuccess' in error && !error.isSuccess) {
          // ApiError인 경우 서버에서 보낸 메시지 사용
          const apiError = error as ApiError;
          toast.error(apiError.message || '일정 삭제에 실패했습니다. 다시 시도해주세요.');
        } else if (error instanceof AxiosError) {
          // AxiosError인 경우 네트워크 에러 등 처리
          if (error.response) {
            toast.error('일정 삭제에 실패했습니다. 다시 시도해주세요.');
          } else if (error.request) {
            toast.error('서버로부터 응답을 받을 수 없습니다. 네트워크 연결을 확인해주세요.');
          } else {
            toast.error('일정 삭제 중 오류가 발생했습니다. 다시 시도해주세요.');
          }
        } else {
          toast.error('일정 삭제에 실패했습니다. 다시 시도해주세요.');
        }
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
      <BoardContainer isEmpty={false} className="[&>div]:max-w-none">
        <div className="relative">
          <div className="flex flex-col items-center gap-4 lg:flex-row lg:items-stretch lg:gap-[2.8125rem]">
            <div className="flex w-full shrink-0 justify-center self-center px-[3.313rem] md:w-auto md:px-0">
              <ScheduleDateGrid
                selectedDate={currentDate}
                setSelectedDate={setCurrentDate}
                calendarItems={calendarsForCalendar}
              />
            </div>
            <div className="2xl:px-[60px] flex h-[436px] w-full flex-col justify-center md:h-[536px] xl:w-1/2 xl:shrink-0 xl:px-[42px]">
              <div className="flex min-h-0 w-full min-w-[160px] flex-1 flex-col gap-4 overflow-y-auto pb-px">
                {isLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <p className="text-gray-500">로딩 중...</p>
                  </div>
                ) : filteredCalendars.length === 0 ? (
                  <div className="flex items-center justify-center py-8">
                    <p className="text-xs text-gray-500 md:text-base lg:text-lg">일정이 없습니다.</p>
                  </div>
                ) : (
                  filteredCalendars.map((item) => (
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
                  ))
                )}
              </div>
              {hasSchedulePermission && (
                <div className="w-full px-8 pt-4">
                  <div className="flex justify-end">
                    {clickedScheduleId === null ? (
                      <Button
                        variant="outline"
                        onClick={() => navigate(`/schedule/edit`)}
                        size={null}
                        className="flex h-[2.625rem] min-w-[7.6875rem] items-center gap-2"
                      >
                        <Pencil className="size-4" />
                        <p>글쓰기</p>
                      </Button>
                    ) : (
                      <div className="flex flex-wrap justify-end gap-2">
                        <Button
                          variant="destructive"
                          size={null}
                          className="flex h-[2.625rem] min-w-16 items-center justify-center px-3"
                          onClick={handleDeleteClick}
                          isDisabled={isDeleting}
                        >
                          삭제
                        </Button>
                        <Button
                          variant="outline"
                          size={null}
                          className="flex h-[2.625rem] min-w-16 items-center justify-center px-3"
                          onClick={() => navigate(`/schedule/edit?id=${clickedScheduleId}`)}
                        >
                          편집
                        </Button>
                        <Button
                          variant="ghost"
                          size={null}
                          className="flex h-[2.625rem] min-w-16 items-center justify-center px-3"
                          onClick={() => {
                            setClickedScheduleId(null);
                            setHoveredScheduleId(null);
                          }}
                        >
                          목록
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </BoardContainer>
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="pt-10 sm:max-w-[425px] [&>button]:hidden">
          <DialogHeader className="flex flex-row items-center justify-between">
            <DialogTitle className="text-lg font-semibold">일정 삭제</DialogTitle>
          </DialogHeader>
          <DialogDescription className="mt-2 text-sm text-gray-600">
            정말 이 일정을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
          </DialogDescription>
          <DialogFooter className="mt-6">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)} isDisabled={isDeleting}>
              취소
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm} isDisabled={isDeleting}>
              {isDeleting ? '삭제 중...' : '삭제'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
