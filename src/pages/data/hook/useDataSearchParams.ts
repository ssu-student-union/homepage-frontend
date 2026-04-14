import { useZodSearchParams } from '@/routes/router';
import { DataQuerySchema } from '../schema';
import { DataCategoryValue } from '../components/CategoryPopover';
import { useCallback, useMemo } from 'react';

/**
 * 자료집 전용 라우팅 파라미터 훅
 * - 공용 useZodSearchParams를 래핑하여 자료집 비즈니스 로직(카테고리/검색 변경 시 페이지 초기화 등)을 제공합니다.
 */
export function useDataSearchParams() {
  const { parsed, setParams, resetParams } = useZodSearchParams(DataQuerySchema);

  const category = useMemo<DataCategoryValue>(() => {
    const arr: string[] = [];
    if (parsed.majorCategory) {
      arr.push(parsed.majorCategory);
      if (parsed.middleCategory) {
        arr.push(parsed.middleCategory);
        if (parsed.subCategory) {
          arr.push(parsed.subCategory);
        }
      }
    }
    return arr as DataCategoryValue;
  }, [parsed.majorCategory, parsed.middleCategory, parsed.subCategory]);

  const setCategory = useCallback((newCategory: DataCategoryValue) => {
    setParams({
      majorCategory: newCategory[0] ?? null,
      middleCategory: newCategory[1] ?? null,
      subCategory: newCategory[2] ?? null,
      page: null,
    });
  }, [setParams]);

  const handleSearch = useCallback((value: string) => {
    setParams({
      q: value || null,
      page: null,
    });
  }, [setParams]);

  return {
    parsed,
    category,
    setCategory,
    handleSearch,
    resetParams,
  };
}
