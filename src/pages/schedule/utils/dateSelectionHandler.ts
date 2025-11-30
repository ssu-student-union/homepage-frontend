import { isSameDay, isBefore, isAfter, isValid } from 'date-fns';

/**
 * 날짜 선택 상태를 관리하는 타입
 */
export interface DateSelectionState {
  startDate: Date | null;
  endDate: Date | null;
}

/**
 * 날짜 범위 선택을 위한 헬퍼 함수들
 */
export interface DateSelectionHelpers {
  isDateSelected: (date: Date) => boolean;
  isDateStart: (date: Date) => boolean;
  isDateEnd: (date: Date) => boolean;
  isDateInRange: (date: Date) => boolean;
}

/**
 * 날짜 범위 선택을 위한 헬퍼 함수들을 생성
 *
 * @description
 * 시작일자와 종료일자를 기반으로 날짜 선택 상태를 확인하는 헬퍼 함수들을 반환합니다.
 * 이 함수들을 사용하면 로직 중복을 방지하고 일관된 날짜 선택 상태를 관리할 수 있습니다.
 *
 * @example
 * ```tsx
 * const [startDate, setStartDate] = useState<Date | null>(null);
 * const [endDate, setEndDate] = useState<Date | null>(null);
 *
 * const { isDateSelected, isDateStart, isDateEnd } = createDateSelectionHelpers(startDate, endDate);
 *
 * // DateGrid에서 사용
 * <DateGrid
 *   isDateSelected={isDateSelected}
 *   isDateStart={isDateStart}
 *   isDateEnd={isDateEnd}
 * />
 * ```
 *
 * @param startDate - 현재 선택된 시작일자 (없으면 null)
 * @param endDate - 현재 선택된 종료일자 (없으면 null)
 * @returns 날짜 선택 상태를 확인하는 헬퍼 함수들
 */
export function createDateSelectionHelpers(startDate: Date | null, endDate: Date | null): DateSelectionHelpers {
  return {
    isDateSelected: (date: Date): boolean => {
      if (!startDate && !endDate) return false;
      if (startDate && isSameDay(date, startDate)) return true;
      if (endDate && isSameDay(date, endDate)) return true;
      if (startDate && endDate && isAfter(date, startDate) && isBefore(date, endDate)) {
        return true;
      }
      return false;
    },

    isDateStart: (date: Date): boolean => {
      return startDate !== null && isSameDay(date, startDate);
    },

    isDateEnd: (date: Date): boolean => {
      return endDate !== null && isSameDay(date, endDate);
    },

    isDateInRange: (date: Date): boolean => {
      if (!startDate || !endDate) return false;
      return isAfter(date, startDate) && isBefore(date, endDate);
    },
  };
}

/**
 * 날짜 클릭 시 선택 상태를 업데이트하는 핸들러 함수
 *
 * @description
 * 이 함수는 날짜 범위 선택 UI에서 사용자의 날짜 클릭에 따라 시작일자와 종료일자를 자동으로 관리합니다.
 *
 * 동작 규칙:
 * 1. 시작일자가 없는 경우: 클릭한 날짜를 시작일자와 종료일자로 동일하게 설정
 * 2. 시작일자만 있는 경우:
 *    - 같은 날짜 클릭: 종료일자도 동일하게 설정 (하나의 날짜만 선택된 상태)
 *    - 시작일자보다 앞선 날짜 클릭: 자동으로 시작일자와 종료일자 교체
 *    - 시작일자보다 뒤인 날짜 클릭: 종료일자로 설정
 * 3. 시작일자와 종료일자가 모두 있는 경우:
 *    - 시작일자 클릭: 시작일자를 종료일자와 동일하게 설정 (날짜가 하나만 남음)
 *    - 종료일자 클릭: 종료일자를 시작일자와 동일하게 설정 (날짜가 하나만 남음)
 *    - 시작일자보다 앞선 날짜 클릭: 시작일자를 해당 날짜로 확장
 *    - 종료일자보다 뒤인 날짜 클릭: 종료일자를 해당 날짜로 확장
 *    - 범위 내 날짜 클릭: 해당 날짜를 시작일자로 설정하고 종료일자는 유지
 *
 * @example
 * ```tsx
 * const [startDate, setStartDate] = useState<Date | null>(null);
 * const [endDate, setEndDate] = useState<Date | null>(null);
 *
 * const handleDateClick = (date: Date) => {
 *   handleDateSelection(date, startDate, endDate, setStartDate, setEndDate);
 * };
 * ```
 *
 * @param clickedDate - 사용자가 클릭한 날짜
 * @param startDate - 현재 선택된 시작일자 (없으면 null)
 * @param endDate - 현재 선택된 종료일자 (없으면 null)
 * @param onStartDateChange - 시작일자를 변경하는 콜백 함수
 * @param onEndDateChange - 종료일자를 변경하는 콜백 함수
 */
export function handleDateSelection(
  clickedDate: Date,
  startDate: Date | null,
  endDate: Date | null,
  onStartDateChange: (date: Date | null) => void,
  onEndDateChange: (date: Date | null) => void
): { cancelled: boolean } {
  // 유효성 검증
  if (!isValid(clickedDate)) {
    console.warn('Invalid date provided to handleDateSelection');
    return { cancelled: false };
  }

  // 1. 시작일자가 없는 경우
  if (!startDate) {
    onStartDateChange(clickedDate);
    onEndDateChange(clickedDate);
    return { cancelled: false };
  }

  // 2. 시작일자만 있는 경우
  if (!endDate) {
    if (isSameDay(clickedDate, startDate)) {
      onStartDateChange(null);
      return { cancelled: true };
    }

    if (isBefore(clickedDate, startDate)) {
      onEndDateChange(startDate);
      onStartDateChange(clickedDate);
      return { cancelled: false };
    }

    onEndDateChange(clickedDate);
    return { cancelled: false };
  }

  // 3. 시작일자와 종료일자가 모두 있는 경우
  if (startDate && endDate && isSameDay(startDate, endDate)) {
    if (isSameDay(clickedDate, startDate)) {
      onStartDateChange(null);
      onEndDateChange(null);
      return { cancelled: true };
    }
    if (isBefore(clickedDate, startDate)) {
      onStartDateChange(clickedDate);
      return { cancelled: false };
    }

    onEndDateChange(clickedDate);
    return { cancelled: false };
  }

  if (isSameDay(clickedDate, startDate)) {
    if (endDate) {
      onStartDateChange(endDate);
    } else {
      onStartDateChange(null);
    }
    return { cancelled: !endDate };
  }

  if (isSameDay(clickedDate, endDate)) {
    if (startDate) {
      onEndDateChange(startDate);
    } else {
      onEndDateChange(null);
    }
    return { cancelled: !startDate };
  }

  if (isBefore(clickedDate, startDate)) {
    onStartDateChange(clickedDate);
    return { cancelled: false };
  }

  if (isAfter(clickedDate, endDate)) {
    onEndDateChange(clickedDate);
    return { cancelled: false };
  }

  onStartDateChange(clickedDate);
  return { cancelled: false };
}
