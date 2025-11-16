export const CATEGORY_COLORS = {
  학사: '#3B82F6',
  총학생회: '#10B981',
  '공휴일/기념일': '#EF4444',
} as const;

export const SCHEDULE_CATEGORIES = [
  '전체',
  ...(Object.keys(CATEGORY_COLORS) as Array<keyof typeof CATEGORY_COLORS>),
] as const;

export type ScheduleCategory = (typeof SCHEDULE_CATEGORIES)[number];

export const DATE_COLORS = {
  sunday: '#FF0000',
  saturday: '#9CA3AF',
  default: '#1F2937',
  selected: '#3B82F6',
} as const;
