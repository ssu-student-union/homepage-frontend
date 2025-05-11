import { mainName } from '@/pages/notice/const';

export function categoryToTitle(category: string) {
  switch (category) {
    case 'president':
      return mainName[0];
    case 'central_executive_committee':
      return mainName[1];
    case 'central_operating_committee':
      return mainName[2];
    default:
      return '쿼리가 잘못되었습니다.';
  }
}

export function subToTitle(subCategory: string) {
  switch (subCategory) {
    case 'intro':
      return '소개';
    case 'org':
      return '조직도';
    default:
      return '쿼리가 잘못되었습니다.';
  }
}
