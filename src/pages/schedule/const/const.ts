export const CATEGORY_COLORS = {
  학사: '#3B82F6',
  총학생회: '#10B981',
  '공휴일/기념일': '#EF4444',
} as const;

export type ScheduleCategoryKey = keyof typeof CATEGORY_COLORS;

export const SCHEDULE_CATEGORY_OPTIONS: readonly ScheduleCategoryKey[] = Object.keys(
  CATEGORY_COLORS
) as ScheduleCategoryKey[];

export const SCHEDULE_CATEGORIES = ['전체', ...SCHEDULE_CATEGORY_OPTIONS] as const;

export type ScheduleCategory = (typeof SCHEDULE_CATEGORIES)[number];

export const DATE_COLORS = {
  sunday: '#FF0000',
  gray: '#9CA3AF',
  default: '#1F2937',
  selected: '#3B82F6',
} as const;

/**
 * 날짜 선택 모드에서 사용하는 색상 상수
 */
export const DATE_SELECTION_COLORS = {
  selected: '#3B82F6',
  inRange: '#E0ECFF',
  text: {
    selected: '#FFFFFF',
    sunday: '#FF0000',
    gray: '#9CA3AF',
    default: '#1F2937',
  },
} as const;

/**
 * 1월 ~ 12월
 */
export const MONTH_NAMES: readonly string[] = Array.from({ length: 12 }, (_, i) => `${i + 1}월`);

/**
 * 카테고리별 우선순위 정의
 * 학사 > 총학생회 > 공휴일/기념일 순서
 */
export const CATEGORY_PRIORITY = {
  학사: 1,
  총학생회: 2,
  '공휴일/기념일': 3,
} as const;

/**
 * 캘린더에 표시할 최대 일정 수
 */
export const MAX_SCHEDULES_PER_DATE = 4;

/**
 * 일정 제목 최대 길이
 */
export const SCHEDULE_TITLE_MAX_LENGTH = 50;

/**
 * API 엔드포인트 경로
 */
export const SCHEDULE_API_PATHS = {
  BASE: '/board/캘린더/calendars',
  getById: (id: number) => `/board/캘린더/calendars/${id}`,
} as const;

/**
 * 권한 관련 상수
 */
export const SCHEDULE_PERMISSIONS = {
  ALLOWED_MEMBER_NAMES: ['총학생회', 'IT지원위원회'] as const,
  ALLOWED_GROUP_CODES: ['총학생회', '관리자'] as const,
} as const;

/**
 * 성공 메시지 상수
 */
export const SCHEDULE_SUCCESS_MESSAGES = {
  CREATED: '일정이 등록되었습니다.',
  UPDATED: '일정이 수정되었습니다.',
  DELETED: '일정이 삭제되었습니다.',
} as const;

/**
 * 권한 에러 메시지
 */
export const SCHEDULE_PERMISSION_MESSAGES = {
  NO_PERMISSION: '일정을 작성/수정할 권한이 없습니다.',
} as const;

/**
 * 달력 날짜 버튼의 공통 스타일 클래스
 * 모든 달력 컴포넌트에서 동일한 텍스트 크기와 버튼 크기를 사용합니다.
 */
export const CALENDAR_DATE_BUTTON_STYLES = {
  /**
   * 날짜 버튼의 기본 스타일 (크기 및 텍스트 크기)
   * 기본: size-6, text-xs
   * md: size-10, text-base
   * lg: size-10, text-base
   * xl: size-10, text-lg
   */
  base: 'flex size-6 cursor-pointer items-center justify-center rounded-full text-xs transition-[background-color,color] md:size-10 md:text-base lg:size-10 lg:text-base xl:size-10 xl:text-lg',
  /**
   * 날짜 범위 선택용 버튼 스타일 (2xl 브레이크포인트 포함)
   * 기본: h-6 w-6, text-xs
   * md: h-10 w-10, text-base
   * lg: h-10 w-10, text-base
   * xl: h-10 w-10, text-lg
   * 2xl: h-12 w-12, text-lg
   */
  rangePicker: 'flex h-6 w-6 cursor-pointer items-center justify-center rounded-full text-xs transition-[background-color,color] md:h-10 md:w-10 md:text-base lg:h-10 lg:w-10 lg:text-base xl:h-10 xl:w-10 xl:text-lg 2xl:h-12 2xl:w-12 2xl:text-lg',
} as const;
