interface UserInfo {
  name: string;
  nickname?: string;
  account?: string;
  studentId?: string;
  majorCode?: string;
  memberCode: string;
  isUnion: boolean;
}

export interface UserContainerProps {
  isUnion: boolean;
  userInfo?: UserInfo;
}
