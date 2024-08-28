import { atom } from 'recoil';

export const SearchState = atom<string>({
  key: 'searchState',
  default: '',
});
