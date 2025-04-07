import { useMemo } from 'react';

export const useQueryUpdater = (): ((query: string, value: string | ((prevValue: string) => string)) => string) => {
  const search = useMemo(() => new URLSearchParams(location.search), []);
  return (query, value) => {
    search.set(query, typeof value === 'string' ? value : value(search.get(query) ?? ''));
    return `?${search.toString()}`;
  };
};
