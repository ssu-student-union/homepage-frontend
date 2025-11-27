export const CATEGORY_COLORS = {
  학사: '#3B82F6',
  총학생회: '#10B981',
  '공휴일/기념일': '#EF4444',
} as const;

export const SCHEDULE_CATEGORY_OPTIONS = Object.keys(CATEGORY_COLORS) as Array<keyof typeof CATEGORY_COLORS>;

export const SCHEDULE_CATEGORIES = ['전체', ...SCHEDULE_CATEGORY_OPTIONS] as const;

export type ScheduleCategory = (typeof SCHEDULE_CATEGORIES)[number];

export const DATE_COLORS = {
  sunday: '#FF0000',
  saturday: '#9CA3AF',
  default: '#1F2937',
  selected: '#3B82F6',
} as const;

/**
 * 날짜 선택 모드에서 사용하는 색상 상수
 */
export const DATE_SELECTION_COLORS = {
  selected: '#3B82F6',
  inRange: '#E0E7FF',
  text: {
    selected: 'white',
    sunday: '#FF0000',
    saturday: '#9CA3AF',
    default: '#1F2937',
  },
} as const;

/**
 * 1월 ~ 12월
 */
export const MONTH_NAMES = [
  '1월',
  '2월',
  '3월',
  '4월',
  '5월',
  '6월',
  '7월',
  '8월',
  '9월',
  '10월',
  '11월',
  '12월',
] as const;

