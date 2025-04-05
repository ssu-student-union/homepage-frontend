import { atom } from 'jotai';
import { atomFamily, atomWithStorage } from 'jotai/utils';

export const SearchState = atom('');

export const todayPostCountState = atomFamily((_groupCode: string) => atom(0));

export const LoginState = atomWithStorage('login-state', false);

export const commentLoadingState = atom(false);
