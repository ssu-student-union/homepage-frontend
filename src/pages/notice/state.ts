import { atom } from 'jotai';

// 이미지 압축 상태를 나타내는 atom state입니다.
export const compressLoadingState = atom(false);
export const compressErrorState = atom(false);
