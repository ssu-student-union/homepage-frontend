import { mainName } from '../const/data';

// Title
export function paramToTitle(category: string) {
  switch (category) {
    case 'president':
      return mainName[0];
    case 'central_executive_committee':
      return mainName[1];
    case 'central_operating_committee':
      return mainName[2];
    case 'audit':
      return '감사기구';
    default:
      return '쿼리가 잘못되었습니다.';
  }
}

// 연혁
export function paramToHisNum(category: string) {
  switch (category) {
    case 'president':
      return '제64대';
    case 'central_executive_committee':
      return '제64대';
    case 'central_operating_committee':
      return '제64대';
    case 'audit':
      return '제12대';
    default:
      return '쿼리가 잘못되었습니다.';
  }
}

// subTitle
export function paramToSubTitle(category: string) {
  switch (category) {
    case 'president':
      return mainName[0];
    case 'central_executive_committee':
      return mainName[1];
    case 'central_operating_committee':
      return mainName[2];
    case 'audit':
      return '중앙감사위원회';
    default:
      return '쿼리가 잘못되었습니다.';
  }
}

// 조직 닉네임
export function paramToName(category: string) {
  switch (category) {
    case 'president':
      return 'US:SUM';
    case 'audit':
      return '한빛';
    case 'central_executive_committee':
      return '';
    case 'central_operating_committee':
      return '';
    default:
      return '쿼리가 잘못되었습니다.';
  }
}
