import { useSetRecoilState } from 'recoil';
import { SearchState } from '@/recoil/atoms/atom';

export function useResetSearch() {
  const setSearchInput = useSetRecoilState(SearchState);

  const resetSearch = () => {
    setSearchInput('');
  };

  return resetSearch;
}
