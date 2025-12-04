import { UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ApiError, ApiResponse } from '@/hooks/new/useStuQuery';
import { useStuMutation } from '@/hooks/new/useStuMutation';
import { clientAuth } from '@/apis/client';
import { SCHEDULE_API_PATHS } from '../../const/const';

export interface UseDeleteScheduleOptions {
  mutationOptions?: Omit<
    UseMutationOptions<DeleteScheduleResponse, AxiosError | ApiError, DeleteScheduleVariables>,
    'mutationFn'
  >;
}

interface DeleteScheduleVariables {
  calendarId: number;
}

export type DeleteScheduleResponse = Record<string, never>;

export function useDeleteSchedule({ mutationOptions }: UseDeleteScheduleOptions = {}) {
  return useStuMutation(async ({ calendarId }) => {
    return (
      await clientAuth<ApiResponse<DeleteScheduleResponse>>({
        method: 'delete',
        url: SCHEDULE_API_PATHS.getById(calendarId),
      })
    ).data;
  }, mutationOptions);
}
