import { TFunction } from 'i18next';
import { To } from 'react-router';

export const buildHumanRightsCategories: (t: TFunction) => { id: string; name: string; to: To }[] = (t) => [
  { id: '전체', name: t('board-selector.전체'), to: { search: '?category=전체' } },
  { id: '접수대기', name: t('board-selector.접수대기'), to: { search: '?category=접수대기' } },
  { id: '접수완료', name: t('board-selector.접수완료'), to: { search: '?category=접수완료' } },
];
