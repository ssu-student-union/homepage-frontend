import { ApiError, useStuQuery } from '@/hooks/new/useStuQuery';
import { AxiosError, AxiosRequestConfig } from 'axios';
import { UndefinedInitialDataOptions } from '@tanstack/react-query';
import { ZodError } from 'zod';
import { CalendarResponse, CalendarResponseSchema } from '../../types';
import { formatDateToYYYYMM } from '../../utils/dateFormat';
import { SCHEDULE_API_PATHS } from '../../const/const';

export interface UseGetCalendarsOptions {
  date: Date;
  queryOptions?: Omit<
    UndefinedInitialDataOptions<CalendarResponse, AxiosError | ApiError | ZodError, CalendarResponse>,
    'queryKey' | 'queryFn' | 'select'
  >;
}

/**
 * 캘린더 일정을 조회하는 훅입니다.
 * @param date - 조회할 날짜 (YYYYMM 형식으로 변환됨)
 */
export function useGetCalendars({ date, queryOptions }: UseGetCalendarsOptions) {
  const dateString = formatDateToYYYYMM(date);
  const queryKey = ['getCalendars', dateString];
  const config: AxiosRequestConfig = {
    url: SCHEDULE_API_PATHS.BASE,
    method: 'get',
    params: {
      date: dateString,
    },
  };

  return useStuQuery<CalendarResponse, CalendarResponse, AxiosError | ApiError | ZodError>(queryKey, config, {
    select: (data) => {
      return CalendarResponseSchema.parse(data);
    },
    ...queryOptions,
  });
}

