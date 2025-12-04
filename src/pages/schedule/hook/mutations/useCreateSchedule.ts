import { UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ApiError, ApiResponse } from '@/hooks/new/useStuQuery';
import { useStuMutation } from '@/hooks/new/useStuMutation';
import { clientAuth } from '@/apis/client';
import { ScheduleEditRequest } from '../../schema';
import { SCHEDULE_API_PATHS } from '../../const/const';

export interface UseCreateScheduleOptions {
  mutationOptions?: Omit<
    UseMutationOptions<CreateScheduleResponse, AxiosError | ApiError, CreateScheduleVariables>,
    'mutationFn'
  >;
}

interface CreateScheduleVariables {
  schedule: ScheduleEditRequest;
}

export interface CreateScheduleResponse {
  calendarId: number;
}

export function useCreateSchedule({ mutationOptions }: UseCreateScheduleOptions = {}) {
  return useStuMutation(async ({ schedule }) => {
    return (
      await clientAuth<ApiResponse<CreateScheduleResponse>>({
        method: 'post',
        url: SCHEDULE_API_PATHS.BASE,
        data: schedule,
      })
    ).data;
  }, mutationOptions);
}

