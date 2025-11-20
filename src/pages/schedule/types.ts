import { z } from 'zod';
import { PostAclSchema } from '@/schemas/common';

/**
 * 캘린더 일정 항목 스키마
 */
export const CalendarItemSchema = z.object({
  calenderId: z.number(),
  calendarCategory: z.enum(['학사', '총학생회', '공휴일/기념일']),
  title: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  isDDay: z.boolean(),
});

export type CalendarItem = z.infer<typeof CalendarItemSchema>;

/**
 * 캘린더 API 응답 스키마
 */
export const CalendarResponseSchema = z.object({
  calendarEventResponseList: z.array(CalendarItemSchema),
  allowedAuthorities: z.array(PostAclSchema),
  deniedAuthorities: z.array(PostAclSchema),
});

export type CalendarResponse = z.infer<typeof CalendarResponseSchema>;

