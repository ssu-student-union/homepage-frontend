import { atom } from 'recoil';
import { atomFamily } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const SearchState = atom<string>({
  key: 'searchState',
  default: '',
});

export const todayPostCountState = atomFamily<number, string>({
  key: 'todayPostCountState',
  default: 0,
});

export const LoginState = atom<boolean>({
  key: 'loginState',
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const commentLoadingState = atom<boolean>({
  key: 'commentLoadingState',
  default: false,
});
