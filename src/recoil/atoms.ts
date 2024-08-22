import { AddIngredientType } from '@/types/ScanReceiptType';
import { getSessionStorage, setSessionStorage } from '@/utils/sessionStorageUtil';
import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const loginState = atom<boolean>({
  key: 'LoginState',
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const nickNameState = atom<string>({
  key: 'NickNameState',
  default: '',
  effects_UNSTABLE: [persistAtom],
});

export const kakakLoginState = atom<boolean>({
  key: 'KakaoLoginState',
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const ingredientDataListState = atom<AddIngredientType[]>({
  key: 'IngredientDataListState',
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const ingredientsState = atom<string[]>({
  key: 'ingredientsState',
  default: getSessionStorage('ingredients') || [],
  effects_UNSTABLE: [
    ({ onSet }) => {
      onSet((newValue) => {
        setSessionStorage('ingredients', newValue);
      });
    },
  ],
});

interface Filtering {
  category: string[];
  nonPreferred: string[];
}

export const filteringState = atom<Filtering>({
  key: 'filteringState',
  default: getSessionStorage('filtering') || [],
  effects_UNSTABLE: [
    ({ onSet }) => {
      onSet((newValue) => {
        setSessionStorage('filtering', newValue);
      });
    },
  ],
});
