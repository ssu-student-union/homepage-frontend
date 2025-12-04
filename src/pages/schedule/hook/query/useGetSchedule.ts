import { ApiError, useStuQuery } from '@/hooks/new/useStuQuery';
import { AxiosError, AxiosRequestConfig } from 'axios';
import { UndefinedInitialDataOptions } from '@tanstack/react-query';
import { ZodError } from 'zod';
import { CalendarItem, CalendarItemSchema } from '../../types';
import { SCHEDULE_API_PATHS } from '../../const/const';

export interface UseGetScheduleOptions {
  calendarEventId: number;
  queryOptions?: Omit<
    UndefinedInitialDataOptions<CalendarItem, AxiosError | ApiError | ZodError, CalendarItem>,
    'queryKey' | 'queryFn' | 'select'
  >;
}

/**
 * 캘린더 일정 단건을 조회하는 훅입니다.
 * @param calendarEventId - 조회할 일정 ID
 */
export function useGetSchedule({ calendarEventId, queryOptions }: UseGetScheduleOptions) {
  const queryKey = ['getSchedule', calendarEventId];
  const config: AxiosRequestConfig = {
    url: SCHEDULE_API_PATHS.getById(calendarEventId),
    method: 'get',
  };

  return useStuQuery<CalendarItem, CalendarItem, AxiosError | ApiError | ZodError>(queryKey, config, {
    select: (data) => {
      return CalendarItemSchema.parse(data);
    },
    ...queryOptions,
  });
}
