import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const LikeState = atom<boolean>({
  key: 'likeState',
  default: false,
  effects_UNSTABLE: [persistAtom],
});
