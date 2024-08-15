import { mainName } from '../const/data';

// IntroEdit/utils/dataUtils와 중복이여서 불편하지만 일단은 이렇게 해놓겠습니다.
export function paramToTitle(category: string) {
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
