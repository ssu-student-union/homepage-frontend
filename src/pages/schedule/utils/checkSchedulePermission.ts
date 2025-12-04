import { SCHEDULE_PERMISSIONS } from '../const/const';

/**
 * 일정 관리 권한을 확인하는 유틸리티 함수
 * 총학생회 또는 IT지원위원회 계정만 일정을 작성/수정/삭제할 수 있습니다.
 * @returns {boolean} 권한이 있으면 true, 없으면 false
 */
export function checkSchedulePermission(): boolean {
  const memberName = localStorage.getItem('memberName');
  const groupCodeListStr = localStorage.getItem('groupCodeList');

  if (!memberName || !groupCodeListStr) {
    return false;
  }

  // 허용된 멤버 이름 확인
  if (
    SCHEDULE_PERMISSIONS.ALLOWED_MEMBER_NAMES.includes(
      memberName as (typeof SCHEDULE_PERMISSIONS.ALLOWED_MEMBER_NAMES)[number]
    )
  ) {
    return true;
  }

  // 그룹 코드 확인
  try {
    const groupCodeList: string[] = JSON.parse(groupCodeListStr);
    return SCHEDULE_PERMISSIONS.ALLOWED_GROUP_CODES.some((code) => groupCodeList.includes(code));
  } catch (error) {
    console.error('groupCodeList 파싱 오류:', error);
    return false;
  }
}
