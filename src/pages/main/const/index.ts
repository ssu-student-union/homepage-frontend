import { MainSubcategoriesType } from '../type';

const MainSubcategories: MainSubcategoriesType[] = [
  '전체',
  '총학생회',
  '중앙운영위원회',
  '선거관리위원회',
  '동아리연합회',
];

const MAIN_PENDING = 'main-pending' as const;

export { MainSubcategories, MAIN_PENDING };
