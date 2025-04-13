import { TFunction } from 'i18next';
import { To } from 'react-router';

// Breadcrumb
export const items = new Map<string, string | null>([
  ['공지사항', null],
  ['공지사항', '/notice'],
]);
export const mainName: string[] = ['중앙', '단과대'];

export const subName: string[] = [
  '전체',
  '총학생회',
  '중앙운영위원회',
  '중앙감사위원회',
  '중앙선거관리위원회',
  '동아리연합회',
];

export const subName2: string[] = [
  '전체',
  '경영대학',
  '경제통상대학',
  '공과대학',
  '법과대학',
  '사회과학대학',
  '인문대학',
  '자연과학대학',
  'IT대학',
  '융합특성화자유전공학부',
];

export const buildCentralSubCategories: (t: TFunction) => { id: string; name: string; to: To }[] = (t) => [
  { id: '전체', name: t('board-selector.전체'), to: { search: '?category=중앙' } },
  { id: '총학생회', name: t('board-selector.총학생회'), to: { search: '?category=중앙&sub=총학생회' } },
  {
    id: '중앙운영위원회',
    name: t('board-selector.중앙운영위원회'),
    to: { search: '?category=중앙&sub=중앙운영위원회' },
  },
  {
    id: '중앙감사위원회',
    name: t('board-selector.중앙감사위원회'),
    to: { search: '?category=중앙&sub=중앙감사위원회' },
  },
  {
    id: '중앙선거관리위원회',
    name: t('board-selector.중앙선거관리위원회'),
    to: { search: '?category=중앙&sub=중앙선거관리위원회' },
  },
  { id: '동아리연합회', name: t('board-selector.동아리연합회'), to: { search: '?category=중앙&sub=동아리연합회' } },
];

export const buildCollageSubCategories: (t: TFunction) => { id: string; name: string; to: To }[] = (t) => [
  { id: '전체', name: t('board-selector.전체'), to: { search: '?category=단과대' } },
  { id: '경영대학', name: t('board-selector.경영대학'), to: { search: '?category=단과대&sub=경영대학' } },
  { id: '경제통상대학', name: t('board-selector.경제통상대학'), to: { search: '?category=단과대&sub=경제통상대학' } },
  { id: '공과대학', name: t('board-selector.공과대학'), to: { search: '?category=단과대&sub=공과대학' } },
  { id: '법과대학', name: t('board-selector.법과대학'), to: { search: '?category=단과대&sub=법과대학' } },
  { id: '사회과학대학', name: t('board-selector.사회과학대학'), to: { search: '?category=단과대&sub=사회과학대학' } },
  { id: '인문대학', name: t('board-selector.인문대학'), to: { search: '?category=단과대&sub=인문대학' } },
  { id: '자연과학대학', name: t('board-selector.자연과학대학'), to: { search: '?category=단과대&sub=자연과학대학' } },
  { id: 'IT대학', name: t('board-selector.IT대학'), to: { search: '?category=단과대&sub=IT대학' } },
  {
    id: '융합특성화자유전공학부',
    name: '융합특성화자유전공학부',
    to: { search: '?category=단과대&sub=융합특성화자유전공학부' },
  },
];
