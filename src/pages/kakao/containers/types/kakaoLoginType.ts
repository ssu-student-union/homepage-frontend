export interface UserType {
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
