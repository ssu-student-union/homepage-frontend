import { TFunction } from 'i18next';
import { To } from 'react-router';

interface QnaCategory {
  id: string;
  name: string;
  to: To;
}

export const buildQnACategories: (
  t: TFunction,
  qnaMemberCode: string | '',
  qnaMajorCode: string | ''
) => QnaCategory[] = (t, qnaMemberCode, qnaMajorCode) =>
  [
    { id: '전체', name: t('board-selector.전체'), to: { search: '?target=전체' } },
    { id: '총학생회', name: t('board-selector.총학생회'), to: { search: '?target=총학생회' } },
    qnaMemberCode && {
      id: qnaMemberCode,
      name: t(`board-selector.${qnaMemberCode}`, { defaultValue: qnaMemberCode }),
      to: { search: `?target=${qnaMemberCode}` },
    },
    qnaMajorCode && {
      id: qnaMajorCode,
      name: t(`departments.${qnaMajorCode}`),
      to: { search: `?target=${qnaMajorCode}` },
    },
  ].filter(Boolean) as QnaCategory[];
