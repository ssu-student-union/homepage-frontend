import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { GetUserProfileResponse } from '@/types/apis/get';

interface UserContainerProps {
  userData: GetUserProfileResponse;
}

export default function UserContainer({ userData }: UserContainerProps) {
  return (
    <div className="w-full px-4">
      {userData.isUnion ? (
        <div className="mx-[20%] mb-10 mt-16 flex flex-col items-center rounded-2xl border-2 border-[#D9D9D9] bg-white px-10 py-6 max-sm:pb-4 sm:mx-[22%] md:mx-10 md:flex-row lg:py-8">
          <Avatar className="mr-0 size-20 max-sm:mb-4 sm:size-24 md:mr-6 lg:mr-8">
            <AvatarImage src="/image/mypage/profile_img.png" alt="profile_default_img" />
            <AvatarFallback>User</AvatarFallback>
          </Avatar>
          <div className="mb-4">
            <div className="mb-2 flex items-center max-lg:mt-6 max-md:justify-center">
              <span className="text-lg font-bold">{userData.name}</span>
            </div>
            <div className="mb-1 text-xs sm:mb-3 md:mb-2 md:text-sm">
              <span>{userData.memberCode}</span>
              {userData.majorCode ? <span>• {userData.majorCode}</span> : ''}
            </div>
          </div>
        </div>
      ) : (
        <div className="mx-[20%] mb-10 mt-16 flex flex-col items-center rounded-2xl border-2 border-[#D9D9D9] bg-white px-10 py-8 max-sm:pb-4 sm:mx-[20%] md:mx-10 md:flex-row md:py-6">
          <img
            className="mr-0 size-20 max-sm:mb-4 sm:size-24 md:mr-6 lg:mr-8"
            src="/image/mypage/profile_img.png"
            alt="profile_default_img"
          />
          <div className="mb-4">
            <div className="mb-2 flex items-center max-lg:mt-6 max-md:justify-center">
              <span className="text-sm font-bold sm:text-base md:text-lg">{userData.name}</span>
              <span className="mx-1 text-xl font-light"> | </span>
              <span className="text-sm font-bold max-sm:m-0 sm:text-base md:text-lg">{userData.studentId}</span>
            </div>
            <div className="mb-3 text-xs sm:text-xs md:mb-2 md:text-sm lg:mb-1">
              <span>{userData.memberCode}•</span>
              <span>{userData.majorCode}•</span>
              <span>재학</span>
            </div>
            {/* <div className="flex text-sm xs:flex-col xs:items-center xs:text-xs sm:flex-col sm:items-center sm:text-xs md:flex-col">
              <span>총학생회비 납부</span>
              <span className="hidden lg:block"> • </span>
              <span>글로벌미디어학부 학생회비 납부</span>
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
}
