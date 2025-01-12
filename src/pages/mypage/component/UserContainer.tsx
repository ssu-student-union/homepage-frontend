import { UserContainerProps } from '../types';

export default function UserContainer({ isAssociation, userInfo, associationInfo }: UserContainerProps) {
  return (
    // props ? api ?
    <>
      {isAssociation && associationInfo ? (
        <div className="mb-16 ml-16 mr-20 mt-16 flex flex-col items-center rounded-lg border-2 border-[#D9D9D9] bg-white p-10 py-8 sm:flex-col">
          <img className="mr-8 h-24 w-24" src="/image/mypage/profile_img.png" alt="profile_default_img" />
          <div>
            <div className="mb-2">
              <span className="text-lg font-bold">{associationInfo.nickname}</span>
            </div>
            <div>
              <span>{associationInfo.college} • </span>
              <span>{associationInfo.department}</span>ㅂ
            </div>
          </div>
        </div>
      ) : (
        <div className="sm:mx-18 m-16 flex flex-row items-center rounded-2xl border-2 border-[#D9D9D9] bg-white px-10 py-8 sm:flex-col md:py-6">
          <img
            className="mr-8 h-24 w-24 sm:mr-0 md:mr-6"
            src="/image/mypage/profile_img.png"
            alt="profile_default_img"
          />
          <div className="mb-4">
            <div className="mb-2 flex items-center sm:mt-6 sm:justify-center md:mt-6">
              <span className="text-lg font-bold sm:text-base">{userInfo?.name}</span>
              <span className="ml-1 mr-1 text-xl font-light"> | </span>
              <span className="text-lg font-bold sm:text-base">{userInfo?.studentId}</span>
            </div>
            <div className="mb-1 text-sm sm:mb-3 sm:text-xs md:mb-2">
              <span>{userInfo?.college} • </span>
              <span>{userInfo?.department} • </span>
              <span>재학</span>
            </div>
            <div className="flex text-sm sm:flex-col sm:items-center sm:text-xs md:flex-col">
              <span>총학생회비 납부</span>
              <span className="hidden lg:block xl:block xxl:block"> • </span>
              <span>글로벌미디어학부 학생회비 납부</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
