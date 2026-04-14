import { useSearchParams } from 'react-router';
import { z } from 'zod';
import { useCallback, useMemo } from 'react';

/**
 * 범용 Zod Query Parameter Hook
 * - 제네릭과 Zod 스키마를 통해 런타임에 파라미터를 검증합니다.
 */
export function useZodSearchParams<T extends z.ZodTypeAny>(schema: T) {
  const [searchParams, setSearchParams] = useSearchParams();

  const parsed = useMemo(() => {
    return schema.parse(Object.fromEntries(searchParams));
  }, [searchParams, schema]) as z.output<T>;

  const setParams = useCallback((updates: Record<string, string | number | undefined | null>) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev.toString());
      for (const [key, value] of Object.entries(updates)) {
        if (value === undefined || value === null || value === '') {
          next.delete(key);
        } else {
          next.set(key, String(value));
        }
      }
      return next;
    });
  }, [setSearchParams]);

  const resetParams = useCallback((keysToRemove: string[]) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev.toString());
      keysToRemove.forEach((key) => next.delete(key));
      return next;
    });
  }, [setSearchParams]);

  return {
    parsed,
    searchParams,
    setSearchParams,
    setParams,
    resetParams,
  };
}
