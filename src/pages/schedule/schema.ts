import { z } from 'zod';
import { SCHEDULE_CATEGORY_OPTIONS } from './const';

/**
 * 일정 작성/수정 폼에서 사용하는 게시물 정보입니다.
 */
export type ScheduleEditForm = z.infer<typeof ScheduleEditFormSchema>;

/**
 * 일정 작성/수정 요청 시 사용하는 게시물 정보입니다.
 * API 요청 형식에 맞춰 Date를 ISO 문자열로 변환하고, category를 calendarCategory로 변환합니다.
 */
export type ScheduleEditRequest = {
  calendarCategory: string;
  startDate: string;
  endDate: string;
  title: string;
  isDDay: boolean;
};

export const ScheduleEditFormSchema = z
  .object({
    title: z.string().min(1, '제목을 입력해주세요.').max(50, '제목은 50자 이내여야 합니다.'),
    category: z.enum(SCHEDULE_CATEGORY_OPTIONS as [string, ...string[]], {
      required_error: '카테고리를 선택해주세요.',
    }),
    startDate: z.date({
      required_error: '시작일자를 선택해주세요.',
    }),
    endDate: z.date({
      required_error: '종료일자를 선택해주세요.',
    }),
    isDDay: z.boolean().default(false),
  })
  .refine((data) => data.endDate >= data.startDate, {
    message: '종료일자는 시작일자보다 이후여야 합니다.',
    path: ['endDate'],
  });

/**
 * 폼 데이터를 API 요청 형식으로 변환하는 헬퍼 함수
 */
export function transformScheduleFormToRequest(formData: ScheduleEditForm): ScheduleEditRequest {
  return {
    calendarCategory: formData.category,
    startDate: formData.startDate.toISOString(),
    endDate: formData.endDate.toISOString(),
    title: formData.title,
    isDDay: formData.isDDay,
  };
}

