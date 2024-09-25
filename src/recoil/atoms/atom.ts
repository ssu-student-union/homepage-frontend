import { atom } from 'recoil';
import { atomFamily } from 'recoil';

export const SearchState = atom<string>({
  key: 'searchState',
  default: '',
});

export const todayPostCountState = atomFamily<number, string>({
  key: 'todayPostCountState',
  default: 0,
});

export const loginState = atom({
  key: 'loginState',
  default: false,
});
