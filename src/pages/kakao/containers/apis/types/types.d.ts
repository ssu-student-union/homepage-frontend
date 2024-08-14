// types.d.ts

export interface KakaoUserData {
  id: number;
  properties: {
    nickname?: string;
    profile_image?: string;
  };
  studentId?: string;
}

export interface TransformedUserData {
  code: string;
  message: string;
  data: {
    id: number;
    name: string | null;
    studentId: string | null;
    isFirst: boolean;
    accessToken: string;
    refreshToken: string;
    profileImage: string | null;
    createdAt: null | string;
  };
  isSuccess: boolean;
}
