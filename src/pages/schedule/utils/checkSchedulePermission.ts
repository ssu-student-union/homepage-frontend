/**
 * 일정 관리 권한을 확인하는 유틸리티 함수
 * 총학생회 또는 중앙집행위원회 계정만 일정을 작성/수정/삭제할 수 있습니다.
 * @returns {boolean} 권한이 있으면 true, 없으면 false
 */
export function checkSchedulePermission(): boolean {
  const memberName = localStorage.getItem('memberName');
  const groupCodeListStr = localStorage.getItem('groupCodeList');

  if (!memberName || !groupCodeListStr) {
    return false;
  }

  if (memberName === '총학생회') {
    return true;
  }

  if (memberName === 'IT지원위원회') {
    return true;
  }

  try {
    const groupCodeList: string[] = JSON.parse(groupCodeListStr);
    if (groupCodeList.includes('총학생회') || groupCodeList.includes('관리자')) {
      return true;
    }
  } catch (error) {
    console.error('groupCodeList 파싱 오류:', error);
  }

  return false;
}
