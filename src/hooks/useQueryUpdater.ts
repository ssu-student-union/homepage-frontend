import { useCallback } from 'react';
import { useSearchParams } from 'react-router';

export const useQueryUpdater = (): ((query: string, value: string | ((prevValue: string) => string)) => string) => {
  const [searchParams] = useSearchParams();

  return useCallback(
    (query, value) => {
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.set(query, typeof value === 'string' ? value : value(newParams.get(query) ?? ''));
      return `?${newParams.toString()}`;
    },
    [searchParams]
  );
};
