interface UserInfo {
  email: string;
  name: string;
  studentId: string;
  phoneNumber: string;
  college: string;
  department: string;
}

interface AssociationInfo {
  id: string;
  name: string;
  nickname: string;
  password: string;

  college: string;
  department: string;
}

export interface UserContainerProps {
  isAssociation: boolean;
  userInfo?: UserInfo | null;
  associationInfo?: AssociationInfo | null;
}
