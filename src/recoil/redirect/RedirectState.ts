import { atom } from 'recoil';

export const redirectState = atom<string>({
  key: 'redirectState',
  default: 'is-student-union',
});
