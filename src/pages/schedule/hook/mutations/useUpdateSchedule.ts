import { UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ApiError, ApiResponse } from '@/hooks/new/useStuQuery';
import { useStuMutation } from '@/hooks/new/useStuMutation';
import { clientAuth } from '@/apis/client';
import { ScheduleEditRequest } from '../../schema';

export interface UseUpdateScheduleOptions {
  mutationOptions?: Omit<
    UseMutationOptions<UpdateScheduleResponse, AxiosError | ApiError, UpdateScheduleVariables>,
    'mutationFn'
  >;
}

interface UpdateScheduleVariables {
  calendarEventId: number;
  schedule: ScheduleEditRequest;
}

export type UpdateScheduleResponse = Record<string, never>;

export function useUpdateSchedule({ mutationOptions }: UseUpdateScheduleOptions = {}) {
  return useStuMutation(async ({ calendarEventId, schedule }) => {
    return (
      await clientAuth<ApiResponse<UpdateScheduleResponse>>({
        method: 'patch',
        url: `/board/캘린더/calendars/${calendarEventId}`,
        data: schedule,
      })
    ).data;
  }, mutationOptions);
}

