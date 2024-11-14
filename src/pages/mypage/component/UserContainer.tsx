import { UserContainerProps } from '../types';

export default function UserContainer({ isAssociation, userInfo, associationInfo }: UserContainerProps) {
  return (
    // props ? api ?
    <>
      {isAssociation && associationInfo ? (
        <div className="mb-16 ml-16 mr-10 mt-16 flex flex-row items-center rounded-lg border-2 border-[#D9D9D9] bg-white p-10 py-8">
          <img className="mr-8 h-24 w-24" src="/image/mypage/profile_img.png" alt="profile_default_img" />
          <div>
            <div className="mb-2">
              <span className="text-lg font-bold">{associationInfo.nickname}</span>
            </div>
            <div>
              <span>{associationInfo.college} • </span>
              <span>{associationInfo.department}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="mb-16 ml-16 mr-10 mt-16 flex flex-row items-center rounded-lg border-2 border-[#D9D9D9] bg-white p-10 py-8">
          <img className="mr-8 h-24 w-24" src="/image/mypage/profile_img.png" alt="profile_default_img" />
          <div>
            <div className="mb-3">
              <span className="text-lg font-bold">{userInfo?.name}</span>
              <span className="ml-1 mr-1 text-xl font-thin"> | </span>
              <span className="text-lg font-bold">{userInfo?.studentId}</span>
            </div>
            <div className="mb-1 text-sm">
              <span>{userInfo?.college} • </span>
              <span>{userInfo?.department} • </span>
              <span>재학</span>
            </div>
            <div className="text-sm">
              <span>총학생회비 납부 • </span>
              <span>글로벌미디어학부 학생회비 납부</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
