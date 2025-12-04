import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { ApiError } from '@/hooks/new/useStuQuery';

/**
 * 일정 관련 에러 메시지 상수
 */
export const SCHEDULE_ERROR_MESSAGES = {
  CREATE_FAILED: '일정 등록에 실패했습니다. 다시 시도해주세요.',
  UPDATE_FAILED: '일정 수정에 실패했습니다. 다시 시도해주세요.',
  DELETE_FAILED: '일정 삭제에 실패했습니다. 다시 시도해주세요.',
  NETWORK_ERROR: '서버로부터 응답을 받을 수 없습니다. 네트워크 연결을 확인해주세요.',
  UNKNOWN_ERROR: '오류가 발생했습니다. 다시 시도해주세요.',
} as const;

/**
 * 일정 관련 작업 타입
 */
export type ScheduleAction = 'create' | 'update' | 'delete';

/**
 * 일정 관련 에러를 처리하고 적절한 토스트 메시지를 표시하는 함수
 *
 * @param error - 처리할 에러 객체
 * @param action - 수행한 작업 타입 ('create' | 'update' | 'delete')
 * @param context - 추가 컨텍스트 (예: '일정 등록 실패')
 */
export function handleScheduleError(
  error: unknown,
  action: ScheduleAction,
  context?: string
): void {
  console.error(context || `일정 ${action} 실패:`, error);

  // ApiError인 경우 서버에서 보낸 메시지 사용
  if (error && typeof error === 'object' && 'isSuccess' in error && !error.isSuccess) {
    const apiError = error as ApiError;
    const defaultMessage =
      action === 'create'
        ? SCHEDULE_ERROR_MESSAGES.CREATE_FAILED
        : action === 'update'
          ? SCHEDULE_ERROR_MESSAGES.UPDATE_FAILED
          : SCHEDULE_ERROR_MESSAGES.DELETE_FAILED;
    toast.error(apiError.message || defaultMessage);
    return;
  }

  // AxiosError인 경우 네트워크 에러 등 처리
  if (error instanceof AxiosError) {
    if (error.response) {
      const defaultMessage =
        action === 'create'
          ? SCHEDULE_ERROR_MESSAGES.CREATE_FAILED
          : action === 'update'
            ? SCHEDULE_ERROR_MESSAGES.UPDATE_FAILED
            : SCHEDULE_ERROR_MESSAGES.DELETE_FAILED;
      toast.error(defaultMessage);
    } else if (error.request) {
      toast.error(SCHEDULE_ERROR_MESSAGES.NETWORK_ERROR);
    } else {
      toast.error(SCHEDULE_ERROR_MESSAGES.UNKNOWN_ERROR);
    }
    return;
  }

  // 기타 에러
  const defaultMessage =
    action === 'create'
      ? SCHEDULE_ERROR_MESSAGES.CREATE_FAILED
      : action === 'update'
        ? SCHEDULE_ERROR_MESSAGES.UPDATE_FAILED
        : SCHEDULE_ERROR_MESSAGES.DELETE_FAILED;
  toast.error(defaultMessage);
}

